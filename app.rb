# encoding: utf-8

require "sinatra/base"
require "slim"
require "./imgur"
require "dimensions"

class App < Sinatra::Base

  get '/' do
    slim :index, layout: :layout
  end

  post '/upload' do
    if params[:file] == "undefined"
      return { error: "No file selected." }.to_json
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
    dimensions = Dimensions.dimensions("data/#{filename}")
    filesize = (File.size("data/#{filename}").to_f / 2**20).round(2)
    imgur_url = upload_image filename
    unless imgur_url
      refresh_token
      imgur_url = upload_image filename
    end
    { filename: filename, filesize: filesize, imgururl: imgur_url, width: dimensions[0], height: dimensions[1] }.to_json
  end

  get '/map' do
    # If your image doesn’t upload to imgur, you can fill in the instance
    # variables commented out here and comment out the redirect
    # in order to have everything work from your local computer. see README
    # for details
    # @imgururl = "location/of/file/in/public/directory.jpg"
    # @width = width_of_image
    # @height = height_of_image
    # @places = "comma, separated, list, of, places"
    # slim :map, layout: :layout
    redirect '/'
  end

  post '/map' do
    @imgururl = params[:imgururl]
    @width = params[:width]
    @height = params[:height]
    @places = params[:places]
    slim :map, layout: :layout
  end

  get '/demo-map' do
    slim :demo_map, layout: :layout
  end

end
