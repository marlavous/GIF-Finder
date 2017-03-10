$(document).ready(function() {

    var characters = ["Mickey Mouse", "Belle", "Nemo", "The Aristocats", "Steamboat Willie", "Minnie Mouse", "Ariel", "Olaf Frozen", "Donald Duck", "Pluto Disney", "Buzz Lightyear", "Cinderella", "Chewbacca", "Alladin", "Han Solo", "Sleeping Beauty"];


    function displayCharacters(){

  		var cast = $(this).attr("data-name");
    	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cast + "&api_key=dc6zaTOxFJmzC&limit=10";

    	$.ajax({
    		url:queryURL,
    		method: "get"
    	}).done(function(response){

    	var results = response.data;

    	for (var i = 0; i < results.length; i++){
    		var castDiv = $("<div class = 'castDiv'>")

    		var p = $("<p>").text("Rating: " + rating)
    		var rating = results[i].rating;

    		var castImg = $("<img>");
    		castImg.attr("src", results[i].images.fixed_height.url);
    		castDiv.append(p);
    		castDiv.append(castImg);
            castImg.addClass("play");

            var gifURL = results[i].images.fixed_height.url;
            var imgURL = results[i].images.original_still.url;

            castImg.attr("data-animate", gifURL);
            castImg.attr("data-still", imgURL)

    		$("#gif-view").prepend(castDiv);
        }

        $(".play").on("click", function(event){
            var state = $(this).attr("data-state");

            if (state === "still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");                
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
                }

            })
    	
    	});
      };

    function makeButtons(){

        $("#buttonlocation").empty();

        for (var i = 0; i < characters.length; i++){
            var a = $("<button>");
            a.addClass("cast");
            a.attr("data-name", characters[i]);
            a.text(characters[i]);
            $("#buttonlocation").append(a);

        }
    }

    $("#addButton").on("click", function(event){
        event.preventDefault();
        var cast = $("#addCast").val().trim();
        characters.push(cast);
        makeButtons();

    })

    $(document).on("click", ".cast", displayCharacters)

    makeButtons();

})

            







		