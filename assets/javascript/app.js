//PSEUDO CODE: 
//PHASE 1: Work basic html divs -- using Bootstrap 
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
// This is the array of topics that show up at the top of the page
var topics = ['Matisse', 'Picasso', 'Van Gogh', 'Jackson Pollock', 'Leonordo da vinci', 'Vermeer', 'Andy Warhol', 'Georges Seurat', 'Campbell\'s soup Warhol'];
// displayTopicInfo function now renders the HTML to display the appropriate content. 
$(document).on('click', '.topicTop', function () {
    var topic = $(this).attr('data-topic');
    // The query only calls on the first ten results
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
    // Creates AJAX call for the specific topic being 
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {
        console.log(response);
        var results = response.data;
        //--------------------------------
        //we empty the div where the Gifs go
        $('#topicsHere').empty();
        //for loop to go through all ten gifs
        for (var i = 0; i < results.length; i++) {
            var topicsDiv = $('<div class="topic pull-left">');
            var p = $('<p>').text("Rating: " + results[i].rating);
            var topicImage = $('<img>');
            // the gifs appear in their still state at first
            topicImage.attr('src', results[i].images.fixed_height_still.url);
            
            topicImage.addClass('gif');
            // the state must be set to "still" first
            topicImage.attr('data-state', 'still');
            // this is used to "animate" the gifs
            topicImage.attr('data-animate', results[i].images.fixed_height.url);
            // this is used to make the gifs "still"
            topicImage.attr('data-still', results[i].images.fixed_height_still.url);
            // the gifs are sent to the HTML along with their respective rating
            topicsDiv.append(p);
            topicsDiv.append(topicImage);
            // This is where the gifs go 
            $('#topicsHere').prepend(topicsDiv);
        }
    });
});
// Generic function for displaying the buttons 
function renderButtons() {
    // Deletes the topics prior to adding new topics/artists
    $('#topicButtons').empty();
    // Loops through the array of topics
    for (var i = 0; i < topics.length; i++) {
        // Then dynamicaly generates buttons for each topic/artist in the array
        var a = $("<button>"); // jQuery creates buttons with specific class
        a.addClass('topicTop btn btn-default'); // Added a specific class
        a.attr('data-topic', topics[i]); // Added a data-attribute that uses name of topic
        a.text(topics[i]); // Provided the initial button text
        $('#topicButtons').append(a); // Added the button to the HTML
    }
}
// This function handles events where one button is clicked
$(document).ready(function () {
    renderButtons();
    $('#addTopic').on('click', function () {
        // This line of code will grab the input from the textbox and trim either extremities of any spaces
        var newtopic = $('#topic-input').val().trim();
        // The topic from the textbox is then added to our array
        topics.push(newtopic);
        
        // The button is then rendered
        renderButtons();
        // This erases the input once the button is submit button is clicked
        $('#topic-input').val('');
        // this is so that the page doesn't refresh once we click on the 'submit' button
        return false;
    });
});

// This function handles the state of the gifs 
$(document).on('click', '.gif', function () { 

    if ($(this).attr('data-state') == 'still'){ //if the state is still...
                $(this).attr('src', $(this).data('animate')); //... then change the src to 'animate' (which we get from Giphy API)
                $(this).attr('data-state', 'animate'); //... and change the name of the state to 'animate'
            }else{ //conversely, if the state is 'animate'...
                $(this).attr('src', $(this).data('still')); // then change the src to 'still' (which we get from Giphy API)
                $(this).attr('data-state', 'still'); // and change the state to 'still'
            }
});

