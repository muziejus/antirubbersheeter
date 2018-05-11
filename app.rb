# encoding: utf-8

require "sinatra/base"
require "slim"
require "RMagick"

class App < Sinatra::Base

  include Magick

  get '/' do
    slim :index, layout: :layout
  end

  post '/upload' do
    if params[:file] == "undefined"
      return { error: "No file selected" }.to_json
    end
    unless params[:file] &&
      (tmpfile = params[:file][:tempfile]) &&
      (name = params[:file][:filename])
      return { error: "No file selected" }.to_json
    end
    filename = "upload-#{Time.now.to_i}-#{name}"
    File.open("data/#{filename}", "wb") do |f|
      f.write(tmpfile.read)
    end
    { filename: filename }.to_json
  end

  post '/tileup' do
    filename = params[:filename]
    file = Image.read("data/#{filename}").first
    i = ImageList.new
    i.new_image(two_five_six(file.columns), two_five_six(file.rows), HatchFill.new('white', 'gray90'))
    i.composite!(file, 0, 0, Magick::OverCompositeOp)
    make_tiles(i, filename)
    "the filename is #{params[:filename]}"
  end

  def two_five_six(num) 
    256 * (1 + ( num / 256 ))
  end

  def make_tiles(i, filename) 
    # from https://github.com/rktjmp/tileup/blob/develop/lib/tileup/tiler.rb
    ext = filename.split(".").last
    dir = "data/#{filename}-tiles"
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
      ci.write "#{dir}/#{c[:col]}_#{c[:row]}.#{ext}"
      ci = nil
    end
  end
end
