$( document ).ready(() => {

  $("#uploadform").submit((e) => {
    $(".progress-bar").addClass("progress-bar-animated").addClass("progress-bar-striped");
    ["upload", "tile", "wetransfer"].forEach((i) => {
      yellowUp("#" + i + "Alert");
    });
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
          greenUp("#uploadAlert");
        }
      },
      complete: function(){
        // $(".progress-bar").removeClass("progress-bar-animated").removeClass("progress-bar-striped");
      }
    });
  });

});

function yellowUp(target){
  $( target ).removeClass("alert-secondary").addClass("alert-warning");
  $( target + " > p").removeClass("text-muted");
}

function greenUp(target){
  $( target ).removeClass("alert-warning").addClass("alert-success");
  $( target + " > p").append("✔");
}
