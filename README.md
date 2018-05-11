# antirubbersheeter

A web application letting you make visualisations on Leaflet maps that don’t rely on Web Mercator.

See the [About](http://antirubbersheeter.moacir.com) page for more about the
rationale. The workflow here is:

1. Upload an image (that gets pushed to Imgur)

1. Add a list of comma-separated place names.

1. Begin the geocoder.

1. Click on the map for each place.

1. Copy the resulting JSON file that gets displayed.

1. Use it for your own important ends.

If you want to avoid using Imgur / uploading / etc.:

* Clone this repo.

* Run `bundle install`

* Copy the image you want to use into this repo’s `public/` directory.

* Edit the `get 'map'` section of `app.rb` so that it looks something like this:

```ruby
get '/map' do
	@imgururl = "your-image.jpg"
	@width = 2560 # or whatever the width of the image is
	@height = 1200 # same
	@places = "List, Of, Places, We, Want, To Geocode"
	slim :map, layout: :layout
  # redirect '/'
end
```

* Fire up puma with `pumactl -F puma.rb start`

* Navigate your browser to `http://localhost:9292/map` and start your geocoder.




