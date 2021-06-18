var dummyRecipeUrl = "https://api.spoonacular.com/recipes/random?number=1&fab4&addRecipeInformation=true&fillIngredients=true&apiKey=f59f88cb8fbf4ac0b0c99e345526552a";
var dummyMovieUrl = "https://omdbapi.com/?apikey=48a5261b&t=star%20wars";

function getId(id){
    var myId = document.getElementById(id)
    return myId
}

var yourMovieInfo = getId("yourMovieInfo")
var yourRecipeInfo = getId("yourRecipeInfo")

function createElement(parent, element, childId){
    var myElement = document.createElement(element);
    myElement.setAttribute("id", childId)
    parent.appendChild(myElement)
}

//fetches both api's for random recipe and random movie
fetch(dummyRecipeUrl)
    .then(function(response){
        console.log(response)
        return response.json();
    })
    .then(data => displayRecipe(data)).catch(err => console.log(err))
        
fetch(dummyMovieUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        displayMovie(data);
    })

//displays random recipe
function displayRecipe (data) {
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
function displayMovie(data){
    console.log(data)
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
