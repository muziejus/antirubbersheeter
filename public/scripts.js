/* global L */
$( document ).ready(() => {

  $("#uploadform").submit((e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", $("#file").get(0).files[0]);
    $.ajax({
      url: "/upload",
      type: "POST",
      data: data,
      processData: false,
      contentType: false,
      success: function(d){
        d = JSON.parse(d);
        if(d.error){
          $("#error").removeClass("d-none").addClass("d-block");
          $("#error > p").html(d.error);
        } else {
          return d;
        }
      },
      complete: function(){
      }
    });
  });

  if($("#mapimage").length > 0){
    var map = L.map("map", {
      crs: L.CRS.Simple,
      minZoom: -5
    });
    const bounds = [[0,0], [2598,2126]];
    L.imageOverlay($("#mapimage").text(), bounds).addTo(map);
    map.fitBounds(bounds);
  }

});

