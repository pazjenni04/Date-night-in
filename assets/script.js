var dummyRecipeUrl = "https://api.spoonacular.com/recipes/random?number=1&fab4&addRecipeInformation=true&fillIngredients=true&apiKey=f59f88cb8fbf4ac0b0c99e345526552a";
var dummyMovieUrl = "https://omdbapi.com/?apikey=48a5261b&t=star%20wars";

function getId(id) {
    var myId = document.getElementById(id)
    return myId
}

var yourMovieInfo = getId("yourMovieInfo")
var yourRecipeInfo = getId("yourRecipeInfo")

function createElement(parent, element, childId) {
    var myElement = document.createElement(element);
    myElement.setAttribute("id", childId)
    parent.appendChild(myElement)
}

//fetches both api's for random recipe and random movie
fetch(dummyMovieUrl)
    .then(function (response) {
        console.log(response)
        return response.json();
    })

    .then(data => {
        localStorage.setItem(data, JSON.stringify(data));
        return data;
    })
    .then(displayMovie);

fetch(dummyRecipeUrl)
    .then(function (response) {
        return response.json();
    })
    .then(data => {
        localStorage.setItem(data, JSON.stringify(data));
        return data;
    })
    .then(displayRecipe);

//displays random recipe
function displayRecipe(data) {
    console.log(data);
    createElement(yourRecipeInfo, "img", "foodImage")
    getId("foodImage").setAttribute("src", data.recipes[0].image)
    createElement(yourRecipeInfo, "h2", "recipeTitle")
    getId("recipeTitle").textContent = data.recipes[0].title
    createElement(yourRecipeInfo, "p", "summary")
    getId("summary").innerHTML = data.recipes[0].summary
    createElement(yourRecipeInfo, "p", "timeRequired")
    getId("timeRequired").textContent = "Ready in " + data.recipes[0].readyInMinutes + " minutes"
}

//displays random movie
function displayMovie(data) {
    createElement(yourMovieInfo, "img", "moviePoster")
    getId("moviePoster").setAttribute("src", data.Poster)
    createElement(yourMovieInfo, "h2", "title")
    getId("title").textContent = data.Title
    createElement(yourMovieInfo, "ul", "movieStats")
    var movieStats = getId("movieStats")
    createElement(movieStats, "li", "actors")
    getId("actors").textContent = "Actors: " + data.Actors
    createElement(movieStats, "li", "director")
    getId("director").textContent = "Director: " + data.Director
    createElement(movieStats, "li", "plot")
    getId("plot").textContent = data.Plot
    createElement(movieStats, "li", "year")
    getId("year").textContent = data.Year
    createElement(movieStats, "li", "rating")
    getId("rating").textContent = "Rated " + data.Rated
    createElement(movieStats, "li", "genre")
    getId("genre").textContent = "Genre: " + data.Genre
    createElement(movieStats, "li", "runtime")
    getId("runtime").textContent = "Runtime: " + data.Runtime
}

//displays modal with results of the api's
function randomEl(event) {
    document.getElementById("date-information").style.display = "block";
}

//closes the modal window when displayed and redirects to landing page
function closeBtn() {
    window.location.href = "/"
}


document.getElementById("randomBtn").addEventListener("click", randomEl) //random btn that user clicks to generate random movie and recipe
document.getElementById("closeBtn").addEventListener("click", closeBtn) //close btn on the generated movie/recipe window in order to close and go back to homepage


//as a user when I click on the favorites tab, I want it to redirect to a seperate html page
//on this html page, I want to display all the favorite dates saved to recall in the future
//need to create a local storage to display onto the page

console.log(yourMovieInfo);

var savetolocal = JSON.parse(localStorage.getItem("favorites")) || [];  //when click button, needs to save to local storage


//local storage works -- now need to only grab certain elements from local storage to display onto favorite-index.html
function datelocalstorage(event) {
    event.preventDefault();

    // var savetofav = {
    //     favRecipe: yourRecipeInfo,
    //     favMovie: yourMovieInfo,
    // }

    // console.log(yourMovieInfo)

    // savetolocal.push(savetofav);

    // localStorage.setItem("favorites", JSON.stringify(savetolocal))

    displayMovie(JSON.parse(localStorage.getItem('movie')));
    displayRecipe(JSON.parse(localStorage.getItem('recipe')));

}

document.getElementById("favBtn").addEventListener("click", datelocalstorage); //when click on the 'save to favorites' btn, then should save to local storage and be available on the favorite's html file


//when click, i need this to open second html file and display local storage results
// document.getElementById('favlink').addEventListener("click", function (event){
//     event.preventDefault();

//     var recipeResults = document.createElement('div')
//     var favoriteResults = document.getElementById('favorite-results');
//     recipeResults.innerHTML = displayRecipe(JSON.parse(localStorage.getItem('recipe')));

//     favoriteResults.appendChild(recipeResults);

// })

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

