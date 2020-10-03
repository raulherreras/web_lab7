$(document).ready(function() {

// Start your code from here
  var temas = ["pikachu", "pichu", "squirtle", "charizard", "gengar", "jigglypuff", "meowth", "dragonite", "mewtwo", "mew"];

  for (var i = 0; i < temas.length; i++) {
    $("#animal-buttons").append(`<button class="animal-button">${temas[i]}</button>`);
  }
});

$("#animal-buttons").on("click", ".animal-button", function(event) {
  event.preventDefault();

  var buttonText = $(this).text();
  var apiKey = "aTLdhFhMUJ2iQs0GuLKNMMD8DorHa3du";

  var xhr = $.get(`https://api.giphy.com/v1/gifs/search?q=${buttonText}&api_key=${apiKey}&limit=10`);
  xhr.done(function(jsonData) {
    console.log("success got data", jsonData);

    $("#animals").html("");
    for (var i = 0; i < 10; i++) {
      var image = $("<img>");
      image.addClass("animal-image");
      image.attr("src", jsonData.data[i].images.fixed_height_still.url);
      image.attr("data-animated", jsonData.data[i].images.fixed_height.url);
      image.attr("data-still", jsonData.data[i].images.fixed_height_still.url);
      image.attr("data-isMoving", "false");

      var div = $("<div>");
      div.addClass("animal-item");
      div.append(`<p>Rating: ${jsonData.data[i].rating}</p>`, image);

      $("#animals").append(div);
    }
  });
});

$("body").on("click",".animal-image", function(event) {
  event.preventDefault();

  if ($(this).attr("data-isMoving") == "false") {
    $(this).attr("src", $(this).attr("data-animated"));
    $(this).attr("data-isMoving", "true");
  }
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-isMoving", "false");
  }
});

$("#add-animal").on("click", function(event) {
  event.preventDefault();

  var animalName = $("#animal-input").val();
  $("#animal-buttons").append(`<button class="animal-button">${animalName}</button>`);
});
