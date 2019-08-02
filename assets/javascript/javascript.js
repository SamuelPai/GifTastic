$(document).ready(function(){

var desserts = ["Ice Cream", "Brownie", "Donut", "Cookie", "Peanut Butter"]

function renderButtons(){
    $("#buttons-view").empty();

    for (var i = 0; i < desserts.length; i++){
        var a = $("<button>");
        a.addClass("dessert-btn");
        a.attr("data-name", desserts[i]);
        a.text(desserts[i]);
        $("#buttons-view").append(a);
    }
}

// function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
//     $(areaToAddTo).empty();
 
//     for (var i = 0; i < arrayToUse.length; i++) {
//       var a = $("<button>");
//       a.addClass(classToAdd);
//       a.attr("data-name", arrayToUse[i]);
//       a.text(arrayToUse[i]);
//       $(areaToAddTo).append(a);
//     }
 
//   }

$(document).on("click", ".dessert-btn", function() {
    $("#desserts").empty();
    $(".dessert-btn").removeClass("active");
    $(this).addClass("active");

    var dessert = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + dessert + "&api_key=AxAWo5MmOdsJdsNGwDI5oR2T06xlexcF&limit=10";;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        var results = response.data;
        

        for(var i = 0; i < results.length; i++){
            var dessertDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var dessertImage = $("<img>").attr("src", response.data.image_original_url);
            var animated = results[i].images.fixed_height.url;
            dessertImage.addClass("dessert-image");
            dessertImage.attr("data-animate", animated);
            var still = results[i].images.fixed_height_still.url;
            dessertImage.attr("src", still);
            dessertImage.attr("data-still", still);
            dessertDiv.append(dessertImage);
            dessertDiv.append(p);
            // $("#dessert-view").append(dessertDiv);
            $("#desserts").append(dessertDiv);
            dessertDiv.append(dessertImage);
            dessertImage.attr("data-state", "still");
            console.log(response.data);
        }
    })
})
$(document).on("click", ".dessert-image", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });



$("#add-dessert").on("click", function(event){
    event.preventDefault();
    var newDessert = $("input").eq(0).val();
    if (newDessert.length > 2){
        desserts.push(newDessert);
    }
    renderButtons(desserts, "dessert-btn", "#dessert-view");
})

renderButtons(desserts, "dessert-btn", "#dessert-view");

})