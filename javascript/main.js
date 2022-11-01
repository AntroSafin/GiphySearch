import API_KEY from "./apikey.js";
/*1.Grab the Input*/

document.querySelector(".js-go").addEventListener('click', function() {
	var inputValue = document.querySelector('.js-userinput').value;
		var userInput = getUserInput();
	searchGiphy( userInput );

});

document.querySelector('.js-userinput').addEventListener('keyup', function (e) {
	if (e.which === 13) {
 		var userInput = getUserInput();
 		searchGiphy( userInput );
    }
});

function getUserInput() {
	var inputValue = document.querySelector('.js-userinput').value;

	return inputValue;
}

/*2.Do the data stuff with the API*/
function searchGiphy( searchQuery ) {
	const api = API_KEY;
	var url = "https://api.giphy.com/v1/gifs/search?api_key=" + api + "&q=" + searchQuery;

	// AJAX Request
	var GiphyAJAXCall = new XMLHttpRequest();
	GiphyAJAXCall.open( 'GET', url );
	GiphyAJAXCall.send();


	GiphyAJAXCall.addEventListener('load', function( data ) {

			var actualData = data.target.response;
			pushToDOM(actualData);
	});

}


/*Show the output i.e GIFs*/

function pushToDOM( response ) {
	// turn response into real javascript object
	response = JSON.parse( response );
	// drill down to the data array
	var images = response.data;

	// find the container to hold this stuff in DOM
	var container = document.querySelector('.js-container');
	// clear it of old content since this function will be used on every search
	// we want to reset the div
	container.innerHTML = "";

	// loop through data array and add IMG html
	images.forEach(function(image){
		// find img src
		var src = image.images.fixed_height.url;

		// concatenate a new IMG tag
		container.innerHTML += "<img src='"+ src +"' class='container-image' />";
	});
}