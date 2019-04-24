$(document).ready(function () {


  var topics = ["leopard", "cheetah", "macaw", "dog", "birds", "kangaroo", "zebra", "Iguana", "horses", "lion", "tiger", "ostrich", "eagle", "buffalo", "giraffe", "camel", "monkeys", "jaguar"]

  //
  function displayGifs(element) {

    console.log($(this));
    $("#animal-Gifs").empty();
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=Zd6cDW9560jLDNXmbdBgLWPO3wWucf5P&limit=10";

    //Perform an AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      //After the data comes back from API
      .then(function (response) {

        //Store an array of results in the result variables
        var results = response.data;
        console.log(results);
        // Looping every result item
        for (var i = 0; i < results.length; i++) {

          //Storing the result's item rating
          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          // var animalDiv =$("<div>");
          if (results[i].rating !== "r" && results[i].rating !== "pg13") {

            var gifSpan = $("<Span>Rating:" + rating + "<br><br></span>");

            //Create an image tag 
            var animalImage = $("<img>");

            // Give the image tag a src attribute of a property pulled of the result items.
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-state", "still");
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("align", "left");
            animalImage.attr("class", "gifs");



            // Append the paragraph and animalImage that create in the gif div


            gifSpan.append(animalImage);
            $("#animal-Gifs").append(gifSpan);

          };
        }
      });
  }



  //render button from array

  function renderButtons() {
    $("#gif-buttons").empty();

    for (var i = 0; i < topics.length; i++) {
      var b = $("<button>");
      b.attr("data-animal", topics[i]);
      b.addClass("gifButtons")
      b.text(topics[i]);
      $("#gif-buttons").append(b);
    };
  };

  $("#submit").on("click", function (event) {
    console.log("hello");
    event.preventDefault();

    var animalGifs = $("#gif-input").val().trim();
    //adding animalgifs from the text box array

    topics.push(animalGifs);
    $("#gif-input").val("");
    console.log(topics);
    //calling renderButtons which handles the processing of animalGifs array
    renderButtons();


  });

  $(document).on("click", "img", animateGif);
  //console.log("hello");
  function animateGif() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
      console.log(this);
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  };

  $(document).on("click", ".gifButtons", displayGifs);

  renderButtons();


  $("body").css("background-image", 'url(assets/images/ngorongoro-safari.jpg');
}); 