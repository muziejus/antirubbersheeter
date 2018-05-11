# encoding: utf-8

require "sinatra/base"
require "slim"

class App < Sinatra::Base

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

  get '/map' do
    @map_image = "./yok.jpg"
    slim :map, layout: :layout
  end
  
end
