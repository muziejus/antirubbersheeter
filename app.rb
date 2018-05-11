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
    imgur_url = "https://i.imgur.com/v4q0RmO.jpg"
    # imgur_url = upload_image filename
    # unless imgur_url
    #   refresh_token
    #   imgur_url = upload_image filename
    # end
    { filename: filename, imgururl: imgur_url, width: dimensions[0], height: dimensions[1] }.to_json
  end

  get '/map' do
    @imgururl = "./yok.jpg"
    slim :map, layout: :layout
  end

  post '/map' do
    @imgururl = params[:imgururl]
    @width = params[:width]
    @height = params[:height]
    @places = params[:places]
    slim :map, layout: :layout
  end
  
end
