require 'rmagick'
require 'fileutils'
require 'zip'
require 'find'
require 'we_transfer_client'

class App
  include Magick

  get "/tiler" do
    file_object = JSON.parse session[:file_object], symbolize_names: true
    minimum_dimension = [file_object[:height], file_object[:width]].sort.first
    zoom_levels = 0
    until minimum_dimension < 500
      zoom_levels = zoom_levels + 1
      minimum_dimension = minimum_dimension.to_f / 2
    end
    dir = File.join "data", "map-#{file_object[:filename].split("-")[1]}"
    tile_dir = File.join dir, "tiles"
    Dir.mkdir dir
    Dir.mkdir tile_dir
    i = ImageList.new(File.join("data", file_object[:filename]))
    zoom_levels.downto(1) do |zoomlevel|
      make_tiles(i, tile_dir, zoomlevel )
      i.resize!(0.5)
    end
    ["map.html", "mapdata.js", "js", "css", "index.html", "README.txt"].each{ |src| FileUtils.cp_r "template/#{src}", dir }
    File.open(File.join(dir, "js/data.js"), "w") do |f|
      f.puts "var data = {"
      f.puts "  height: #{file_object[:height]},"
      f.puts "  width: #{file_object[:width]},"
      f.puts "  placesstring: \"#{session[:places]}\","
      f.puts "  maxzoom: #{zoom_levels}"
      f.puts "};"
    end
    destination_zip = File.join "data", "antirubbersheeter.zip"
    File.delete(destination_zip) if File.exist?(destination_zip)
    Zip::File.open(destination_zip, Zip::File::CREATE) do |zipfile|
      zipdir = "antirubbersheeter"
      zipfile.mkdir zipdir
      Find.find(dir) do |path|
        unless path == dir || path =~ /DS_Store/
          short_path = path.sub("#{dir}/", "")
          if path =~ /\.(js|html|css|txt|jpg|png)$/
            zipfile.add(File.join(zipdir, short_path), path)
          else
            zipfile.mkdir(File.join(zipdir, short_path))
          end
        end
      end
    end
    wt_client = WeTransferClient.new api_key: ENV['WETRANSFER_API_KEY']
    transfer = wt_client.create_transfer(
      name: "Antirubbersheeter Map and Data",
      description: "The tiles and place names registered with your recent visit to the Antirubbersheeter.") do |upload|
      upload.add_file_at path: destination_zip
    end
    @wt_url = transfer.shortened_url
    STDERR.puts @wt_url
    slim :tiler, layout: :layout
  end

  def make_tiles(i, tile_dir, zoomlevel) 
    # from https://github.com/rktjmp/tileup/blob/develop/lib/tileup/tiler.rb
    this_zoom = File.join tile_dir, zoomlevel.to_s
    Dir.mkdir this_zoom
    num_cols = (i.columns / 256.0).ceil
    num_rows = (i.rows / 256.0).ceil
    x,y,col,row = 0,0,0,0
    crops = []
    while true
      x = col * 256
      y = row * 256
      crops << {
        x: x,
        y: y,
        row: row,
        col: col
      }
      col = col + 1
      if col >= num_cols
        col = 0
        row = row + 1
      end
      if row >= num_rows
        break
      end
    end
    crops.each do |c|
      ci = i.crop c[:x], c[:y], 256, 256, true
      ci.write File.join(this_zoom, "#{c[:col]}_#{c[:row]}.jpg")
      ci = nil
    end
  end

  def margin(num)
    (two_five_six(num) - num) / 2
  end

  def two_five_six(num) 
    256 * (1 + ( num / 256 ))
  end

end
