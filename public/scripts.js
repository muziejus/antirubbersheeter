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
          $("#result").removeClass("invisible").addClass("visible").addClass("alert-danger");
          $("#result > p").html(d.error + " Reload and try again.");
        } else {
          $("#result").removeClass("invisible").addClass("visible").addClass("alert-success");
          $("#result > p").html("Upload succeeded. Now geocode →");
          $("#uploadbtn").attr("disabled", true);
          $("#geocodebtn").attr("disabled", false);
          // This is a goofy way to do this… but it works?
          $("#filename").attr("value", d.filename);
          $("#imgururl").attr("value", d.imgururl);
          $("#width").attr("value", d.width);
          $("#height").attr("value", d.height);
          return d;
        }
      }
    });
  });

  if($("#data").length > 0){
    var map = L.map("map", {
      crs: L.CRS.Simple,
      minZoom: -5
    });
    // const bounds = [[0,0], [$("#data").data("height"),$("#data").data("height")]];
    const bounds = [[0,0], [2598,2126]];
    L.imageOverlay($("#data").data("imgururl"), bounds).addTo(map);
    map.fitBounds(bounds);
  }

});

