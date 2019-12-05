// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append(`
    <div class="col-sm-12 d-flex" style="margin-bottom:50px;">
      <div class="card">
        <div class="card-header">
          <p data-id=${data[i]._id}> ${data[i].title}</p>
        </div>
        <div class="card-body">
          <a href="${data[i].link}" target="_blank">View Article</a>
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-success save" data-id=${data[i]._id}>Save Article</button>
        </div>
      </div>
    </div>
    `);
  }
});

//Handle Save Article button
$(document).on("click", ".save", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
      method: "POST",
      url: "/articles/save/" + thisId
  }).done(function(data) {
      window.location = "/"
  })
});