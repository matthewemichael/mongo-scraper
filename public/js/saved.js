$.getJSON("/saved", function(data) {
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
            <button class="btn btn-primary view-notes" type="button" data-target="#noteModal" data-toggle="modal" data-id=${data[i]._id}>View Notes</button>
            <button type="button" class="btn btn-danger delete" data-id=${data[i]._id}>Delete</button>
          </div>
        </div>
      </div>
      `);
    }
});
  
//Handle Delete Article button
$(document).on("click", ".delete", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
      method: "POST",
      url: "/articles/delete/" + thisId
  }).done(function(data) {
      location.reload();
  })
});

// Whenever someone clicks view notes button
$(document).on("click", ".view-notes", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
  // With that done, add the note information to the page
  .then(function(data) {
  console.log(data);
  // The title of the article
  $("#notes").append("<h2>" + data.title + "</h2>");
  // An input to enter a new title
  $("#notes").append("<input id='titleinput' name='title' >");
  // A textarea to add a new note body
  $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
  // A button to submit a new note, with the id of the article saved to it
  $("#notes").append("<button class='btn btn-success' data-id='" + data._id + "' id='savenote'>Save Note</button>");

  // If there's a note in the article
  if (data.note) {
    // Place the title of the note in the title input
    $("#titleinput").val(data.note.title);
    // Place the body of the note in the body textarea
    $("#bodyinput").val(data.note.body);
  }
  });
});

// When you click the save note button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
    // Value taken from title input
    title: $("#titleinput").val(),
    // Value taken from note textarea
    body: $("#bodyinput").val()
    }
  })
  // With that done
  .then(function(data) {
    // Log the response
    console.log(data);
    // Empty the notes section
    $("#notes").text("Note Successfully Saved")
  });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
