require 'rmagick'

class App
  include Magick

  get "/tiler" do
    file_object = JSON.parse session[:file_object], symbolize_names: true
    STDERR.puts file_object
    STDERR.puts file_object[:height]
    STDERR.puts file_object[:width]
    minimum_dimension = [file_object[:height], file_object[:width]].sort.first
    STDERR.puts minimum_dimension
    zoom_levels = 0
    until minimum_dimension < 500
      zoom_levels = zoom_levels + 1
      minimum_dimension = minimum_dimension.to_f / 2
    end
    file = Image.read("data/#{file_object[:filename]}").first
    dir = "data/map-#{file_object[:filename].split("-")[1]}"
    tile_dir = "#{dir}/tiles"
    Dir.mkdir dir
    Dir.mkdir tile_dir
    i = ImageList.new
    i.new_image(two_five_six(file.columns), two_five_six(file.rows), HatchFill.new('white', 'gray90'))
    i.composite!(file, margin(file.columns), margin(file.rows), Magick::OverCompositeOp)
    zoom_levels.times do |zoomlevel|
      make_tiles(i, tile_dir, 20 - zoomlevel )
      i.resize! 0.5
    end
    slim :tiler, layout: :layout
  end

  def make_tiles(i, tile_dir, zoomlevel) 
    # from https://github.com/rktjmp/tileup/blob/develop/lib/tileup/tiler.rb
    dir = "#{tile_dir}/#{zoomlevel}"
    Dir.mkdir dir
    num_cols = i.columns / 256
    num_rows = i.rows / 256
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
