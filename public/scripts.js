/* global hljs, L, demodata */
$(document).ready(() => {
  addExternalLinks("body");

  $("#uploadform").submit(e => {
    e.preventDefault();
    $("#result")
      .removeClass("invisible")
      .addClass("visible")
      .removeClass("alert-danger")
      .html(
        "<div><div class='progress' style='height: .25 rem;'><div class='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 100%'></div></div><p class='m-0'>Uploading file…</p></div>"
      );
    const data = new FormData();
    data.append("file", $("#file").get(0).files[0]);
    $.ajax({
      url: "/upload",
      type: "POST",
      data: data,
      processData: false,
      contentType: false,
      success: function (d) {
        d = JSON.parse(d);
        if (d.error) {
          $("#result")
            .addClass("alert")
            .addClass("alert-danger")
            .html(d.error + " Reload and try again.");
        } else {
          $("#result").addClass("alert").removeClass("alert-danger");
          initStep2(d);
          if (d.imgururl === "not uploaded to imgur") {
            packageMode(d);
          } else {
            $("#result")
              .addClass("alert-success")
              .html("Upload succeeded. Now geocode →");
          }
        }
      },
    });
  });

  if ($("#demomap").length > 0) {
    const map = L.map("demomap", {
      crs: L.CRS.Simple,
      minZoom: -5,
    });
    const bounds = [
      [0, 0],
      [demodata.height, demodata.width],
    ];
    L.imageOverlay(demodata.imgururl, bounds).addTo(map);
    map.fitBounds(bounds);
    demodata.places.forEach(p => {
      L.marker([p.y, p.x]).bindPopup(p.name).addTo(map);
    });
  }

  if ($("#data").length > 0) {
    let data = {};
    let counter = -1;
    Object.keys($("#data").data()).forEach(k => {
      data[k] = $("#data").data(k);
    });
    const map = L.map("map", {
      crs: L.CRS.Simple,
      minZoom: -5,
    });
    const bounds = [
      [0, 0],
      [data.height, data.width],
    ];
    L.imageOverlay(data.imgururl, bounds).addTo(map);
    map.fitBounds(bounds);
    const marker = L.marker([0, 0]).setOpacity(0).addTo(map);
    data.places = data.placesstring.split(",").map(i => {
      return { name: i.trim() };
    });
    $(".card-text").text(
      "Click below to start placing the list of " +
        data.places.length +
        " places on the map."
    );
    $("#geocodingbtn").click(function () {
      marker.setOpacity(0);
      if (counter === data.places.length - 1) {
        data.places[counter].y = parseFloat($("#y").text());
        data.places[counter].x = parseFloat($("#x").text());
        $("#carddiv").html(
          "<p class='card-text'><strong>All done!</strong></p>"
        );
        $("code.json").text(JSON.stringify(data, null, 2));
        $("pre code").each(function (i, block) {
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
          data.places.forEach(p => {
            L.marker([p.y, p.x]).bindPopup(p.name).addTo(map);
          });
        });
      } else {
        if (counter >= 0) {
          data.places[counter].y = parseInt($("#y").text());
          data.places[counter].x = parseInt($("#x").text());
        }
        $("#carddiv").html(
          "<div class='row'><div class='col-6'><em>y</em>: <span id='y'></span></div><div class='col-6'><em>x</em>: <span id='x'></span></div></div>"
        );
        $(".card-title").text(
          "Geocoding " + (counter + 2) + " of " + data.places.length + " places"
        );
        $("#geocodingbtn").text("Save " + data.places[counter + 1].name);
        $("#map").css("cursor", "crosshair");
        map.on("click", e => {
          marker.setLatLng(e.latlng).setOpacity(0.9);
          $("#y").text(e.latlng.lat);
          $("#x").text(e.latlng.lng);
        });
        counter = counter + 1;
      }
    });
  }
});

function initStep2(d) {
  // disable first button, enable second
  $("#uploadbtn").attr("disabled", true);
  $("#geocodebtn").attr("disabled", false);
  // Prefill secret parameters.
  // This is a goofy way to do this… but it works?
  $("#filename").attr("value", d.filename);
  $("#imgururl").attr("value", d.imgururl);
  $("#width").attr("value", d.width);
  $("#height").attr("value", d.height);
}

function packageMode(d) {
  // Change the status, show the modal, and the long progress bar.
  $("#result").addClass("alert-warning").html("Continuing in Package Mode →");
  $("#geocodebtn").html("Start Bundling");
  $("#packagemodal").modal("show");
  $("#packageprogress").removeClass("d-none").addClass("d-block");
  // Rewire the second form and send the data along to the tiler.
  $("#places").focus(() => {
    updateBar(25, "Gathering places…");
  });
  $("#geocodeform")
    .attr("action", "")
    .submit(e => {
      $("#geocodebtn").html("Bundling").attr("disabled", true);
      updateBar(50, "Making tiles…");
      e.preventDefault();
      d.placesstring = $("#places").val();
      $.post("/tileup", d, d => {
        zipPackage(d);
      });
    });
}

function zipPackage(d) {
  updateBar(75, "Zipping up package…");
  $.post("/zipup", { data: d }, d => {
    const newData = JSON.parse(d);
    if (newData.target === "/local-package") {
      window.location.replace("./local-package");
    } else {
      uploadToWeTransfer(d);
    }
  });
}

function uploadToWeTransfer(d) {
  updateBar(95, "Uploading package to WeTransfer…");
  $.post("/uploadToWeTransfer", { data: d }, d => {
    window.location.replace("./package");
  });
}

function updateBar(width, status) {
  $("#packageprogressbar")
    .css("width", width + "%")
    .attr("aria-valuenow", width)
    .html(status);
}

function addExternalLinks(selector) {
  const externalLink = $.parseHTML(
    "<span>&nbsp;<i style='vertical-align: baseline; font-size: 60%;' class='fa fa-small fa-external-link-alt'></i></span>"
  );
  $(selector).find("a[href^='http']:not(a:has(img))").append(externalLink);
  $(selector).find("a[href^='http']").attr("target", "_blank");
}
