require 'rmagick'
require 'fileutils'

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
    dir = "data/map-#{file_object[:filename].split("-")[1]}"
    tile_dir = "#{dir}/tiles"
    Dir.mkdir dir
    Dir.mkdir tile_dir
    i = ImageList.new("data/#{file_object[:filename]}")
    zoom_levels.downto(1) do |zoomlevel|
      make_tiles(i, tile_dir, zoomlevel )
      i.resize!(0.5)
    end
    ["map.html", "mapdata.js", "js", "css", "index.html", "README.txt"].each{ |src| FileUtils.cp_r "template/#{src}", dir }
    File.open("#{dir}/js/data.js", "w") do |f|
      f.puts "var data = {"
      f.puts "  height: #{file_object[:height]},"
      f.puts "  width: #{file_object[:width]},"
      f.puts "  placesstring: \"#{session[:places]}\","
      f.puts "  maxzoom: #{zoom_levels}"
      f.puts "};"
    end
    slim :tiler, layout: :layout
  end

  def make_tiles(i, tile_dir, zoomlevel) 
    # from https://github.com/rktjmp/tileup/blob/develop/lib/tileup/tiler.rb
    dir = "#{tile_dir}/#{zoomlevel}"
    Dir.mkdir dir
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
      ci.write "#{dir}/#{c[:col]}_#{c[:row]}.jpg"
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
