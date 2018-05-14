require 'rmagick'
require 'fileutils'
require 'zip'
require 'find'
require 'we_transfer_client'

class App
  include Magick

  post "/tileup" do
    minimum_dimension = [params[:height].to_i, params[:width].to_i].sort.first
    zoom_levels = 0
    until minimum_dimension < 500
      zoom_levels = zoom_levels + 1
      minimum_dimension = minimum_dimension.to_f / 2
    end
    dir = File.join "data", "map-#{params[:filename].split("-")[1]}"
    tile_dir = File.join dir, "tiles"
    Dir.mkdir dir
    Dir.mkdir tile_dir
    i = ImageList.new(File.join("data", params[:filename]))
    zoom_levels.downto(1) do |zoomlevel|
      STDERR.puts "At zoomlevel #{zoomlevel} for #{params[:filename]}"
      make_tiles(i, tile_dir, zoomlevel )
      i.resize!(0.5)
    end
    STDERR.puts "Done tiling."
    ["map.html", "mapdata.js", "js", "css", "index.html", "README.txt"].each{ |src| FileUtils.cp_r "template/#{src}", dir }
    File.open(File.join(dir, "js/data.js"), "w") do |f|
      f.puts "var data = {"
      f.puts "  height: #{params[:height]},"
      f.puts "  width: #{params[:width]},"
      f.puts "  placesstring: \"#{params[:placesstring]}\","
      f.puts "  maxzoom: #{zoom_levels}"
      f.puts "};"
    end
    params[:packagedir] = dir
    params.to_json
  end

  post "/zipup" do
    dir = JSON.parse(params[:data], symbolize_names: true)[:packagedir]
    destination_zip = File.join "data", "antirubbersheeter-#{dir.split("-").last}.zip"
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
    FileUtils.remove_entry_secure(dir) # don't need the directory anymore.
    # By default, there is no .env file. And even if there were, this
    # is set to "no." See .env.example
    unless ENV['UPLOAD_TO_WETRANSFER'] == "yes"
      session[:destination_zip] = destination_zip
      { target: "/local-package" }.to_json
    else
      { destination_zip: destination_zip }.to_json
    end
  end

  post "/uploadToWeTransfer" do
    destination_zip = JSON.parse(params[:data], symbolize_names: true)[:destination_zip]
    wt_client = WeTransferClient.new api_key: ENV['WETRANSFER_API_KEY']
    transfer = wt_client.create_transfer(
      name: "Antirubbersheeter Map and Data",
      description: "The tiles and place names registered with your recent visit to the Antirubbersheeter.") do |upload|
      upload.add_file_at path: destination_zip
    end
    STDERR.puts transfer.inspect
    session[:destination_zip] = destination_zip
    session[:wt_url] = transfer.shortened_url
    session[:zipsize] = size_in_mb(destination_zip) 
  end

  get "/package" do
    File.delete(session[:destination_zip]) # don't need the zip anymore.
    @wt_url = session[:wt_url]
    @zipsize = session[:zipsize]
    slim :package, layout: :layout
  end

  get "/local-package" do
    zip = session[:destination_zip] 
    slim :local_package, layout: :layout, locals: { zipsize: size_in_mb(zip), zip: zip }
  end

  def make_tiles(i, tile_dir, zoomlevel) 
    # from https://github.com/rktjmp/tileup/blob/develop/lib/tileup/tiler.rb
    this_zoom = File.join tile_dir, zoomlevel.to_s
    Dir.mkdir this_zoom
    num_cols = (i.columns / 256.0).ceil
    num_rows = (i.rows / 256.0).ceil
    STDERR.puts "Making a tile map of #{num_cols} x #{num_rows}, or #{num_cols * num_rows} tiles total."
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
      STDERR.puts "Generated #{this_zoom}/#{c[:col]}_#{c[:row]}.jpg"
      ci = nil
    end
  end

  def margin(num)
    (two_five_six(num) - num) / 2
  end

  def two_five_six(num) 
    256 * (1 + ( num / 256 ))
  end

  def size_in_mb(file)
    (File.size(file).to_f / 2**20).round(2)
  end

end
