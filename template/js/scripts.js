/* global hljs, L, data */

function geocoderInit(){
  let counter = -1;
  const marker = L.marker([0,0]).setOpacity(0).addTo(map);
  data.places = data.placesstring.split(",").map((i) => {
    return { name: i.trim() };
  });
  $(".card-text").text("Click below to start placing the list of " + data.places.length + " places on the map.");
  $("#geocodingbtn").click(function(){
    marker.setOpacity(0);
    if(counter === data.places.length - 1){
      data.places[counter].y = parseFloat($("#y").text());
      data.places[counter].x = parseFloat($("#x").text());
      $("#carddiv").html("<p class='card-text'><strong>All done!</strong></p>");
      $("code.json").text(JSON.stringify(data, null, 2));
      $("pre code").each(function(i, block) {
        hljs.highlightBlock(block);
      });
      $(".card-title").text("Geocoder");
      $("#geocodingbtn").text("Done").attr("disabled", "true");
      $("#geocoder").addClass("d-none");
      $("#datamodal").modal("show");
      $("#openmap").click(() => {
        $("#map").css("cursor", "");
        marker.remove();
        $("#datamodal").modal("hide");
        data.places.forEach((p) => {
          L.marker([p.y, p.x]).bindPopup(p.name).addTo(map);
        });
      });
    } else {
      if(counter >= 0){
        data.places[counter].y = parseInt($("#y").text());
        data.places[counter].x = parseInt($("#x").text());
      }
      $("#carddiv").html("<div class='row'><div class='col-6'><em>y</em>: <span id='y'></span></div><div class='col-6'><em>x</em>: <span id='x'></span></div></div>");
      $(".card-title").text("Geocoding " + (counter + 2) + " of " + data.places.length + " places");
      $("#geocodingbtn").text("Save " + data.places[counter + 1].name);
      $("#map").css("cursor", "crosshair");
      map.on("click", (e) => {
        marker.setLatLng(e.latlng).setOpacity(0.9);
        $("#y").text(e.latlng.lat);
        $("#x").text(e.latlng.lng);
      });
      counter = counter + 1;
    }
  });
}

