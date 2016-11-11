// PHASE 1: Work basic html divs -- using Bootstrap 
//  > top of the page div is for buttons <div id="topicButtons">  
//  > Search bar to the right if possible 
//		> <form id="topic-form">
//	    > <label>Add a Topic</lable>
//		> <input> 
//  > Add a div for the actual gifs
// 		> <div id="topics"></div  
// PHASE 2: Get the Buttons to display gifs first 
// PHASE 3: Get the API to work on the existing buttons
//  > Get the those gifs to stop and start at will 
// PHASE 4: Get the search bar to produce more buttons
//  > Get those new gifs to start and stop 
// PHASE 5: Get the API to connect to the
// ========================================================
var topics = ['Matisse', 'Picasso', 'Van Gogh', 'Jackson Pollock', 'Leonordo da vinci', 'Vermeer', 'Andy Warhol', 'Georges Seurat', 'Campbell\'s soup Warhol'];
// displayTopicInfo function now re-renders the HTML to display the appropriate content. 
$(document).on('click', '.topicTop', function () {
    var topic = $(this).attr('data-topic');

    console.log("TOPIC:" + topic);
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
    // Creates AJAX call for the specific topic being 
    console.log('HERE');
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {
        console.log(response);
        var results = response.data;
        //--------------------------------
        console.log('HERE 2');
        $('#topicsHere').empty();
        for (var i = 0; i < results.length; i++) {
            var topicsDiv = $('<div class="topic pull-left">');
            var p = $('<p>').text("Rating: " + results[i].rating);
            var topicImage = $('<img>');
            topicImage.attr('src', results[i].images.fixed_height_still.url);
            
            topicImage.addClass('gif');
            topicImage.attr('data-state', 'still');
            topicImage.attr('data-animate', results[i].images.fixed_height.url);
            topicImage.attr('data-still', results[i].images.fixed_height_still.url);

            topicsDiv.append(p);
            topicsDiv.append(topicImage);
            $('#topicsHere').prepend(topicsDiv);

        }
    });
});
// ========================================================
// Generic function for displaying movie data 
function renderButtons() {
    // Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
    $('#topicButtons').empty();
    // Loops through the array of movies
    for (var i = 0; i < topics.length; i++) {
        // Then dynamicaly generates buttons for each movie in the array
        // Note the jQUery syntax here... 
        var a = $("<button class='btn btn-default'>"); // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
        a.addClass('topicTop'); // Added a class
        a.attr('data-topic', topics[i]); // Added a data-attribute
        a.text(topics[i]); // Provided the initial button text
        $('#topicButtons').append(a); // Added the button to the HTML
    }
}
// ========================================================
// $(document).ready(function () {
// This function handles events where one button is clicked
$(document).ready(function () {
    renderButtons();
    $('#addTopic').on('click', function () {
        console.log("addTopic");
        // This line of code will grab the input from the textbox
        var newtopic = $('#topic-input').val().trim();
        // The movie from the textbox is then added to our array
        topics.push(newtopic);
        // Our array then runs which handles the processing of our movie array
        $('#topic-input').empty();
        renderButtons();
        // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
        return false;
    });
});


$(document).on('click', '.gif', function () { 

    if ($(this).attr('data-state') == 'still'){
                $(this).attr('src', $(this).data('animate')); // var anuimatedGif = $(this).data('animate'); then replace the part after the 'src'
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
});




// ========================================================
// Generic function for displaying the movieInfo
// $(document).on('click', '.topic', displayTopicInfo);
// ========================================================
// This calls the renderButtons() function