# see https://github.com/cmoa/iiif_s3/blob/master/test.rb

require 'rmagick'
require 'iiif_s3'

opts = {
  image_directory_name: "img",
  output_dir: "/Users/moacir/Projects/antirubbersheeter/data",
  variants: { "reference" => 600, "access" => 1200 },
  upload_to_s3: false,
  image_types: [".jpg", ".tif", ".jpeg", ".tiff", ".png"],
  document_file_types: [".pdf"]
}

@data = []
@cleanup_list = []
@dir = "./public"

def add_image(file, is_doc=false)
  # file = "public/iceland.jpg"
  name = File.basename(file, File.extname(file)) # "iceland"
  name_parts = name.split("_")
  is_paged = name_parts.length == 8
  page_num = is_paged ? name_parts[7].to_i : 1 # 1
  name_parts.pop if is_paged
  id = name_parts.join("_") # "iceland"

  obj = {
    "path" => "#{file}",
    "id" => id,
    "label" => name_parts.join("."),
    "is_master" => page_num == 1,
    "page_number" => page_num,
    "is_document" => false,
    "description" => "This is a test file"
  }

  if is_paged
    obj["section"] = "p#{page_num}"
    obj["section_label"] = "Page #{page_num}"
  end

  @data.push IiifS3::ImageRecord.new(obj)
end

def add_to_cleanup_list(img)
  @cleanup_list.push(img)
end

def cleanup
  @cleanup_list.each do |file|
    File.delete(file)
  end
end

# add_image("public/iceland.jpg")

# iiif = IiifS3::Builder.new(opts)
# iiif.create_build_directories # creates "img"
# iiif.load(@data)
# iiif.process_data # this does all the work
