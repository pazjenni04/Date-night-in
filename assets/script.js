var dummyRecipeUrl = "https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=646a3c17f65f48eb8dc89229bd07fab4&addRecipeInformation=true&fillIngredients=true";
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


fetch(dummyRecipeUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var recipe = data.results[1]
        displayRecipe(recipe);
    })

fetch(dummyMovieUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        displayMovie(data);
    })

function displayRecipe(recipe){
    console.log(recipe);
    createElement(yourRecipeInfo, "img", "foodImage")
    getId("foodImage").setAttribute("src", recipe.image)
    createElement(yourRecipeInfo, "h2", "recipeTitle")
    getId("recipeTitle").textContent = recipe.title
    createElement(yourRecipeInfo, "p", "summary")
    getId("summary").innerHTML = recipe.summary
    createElement(yourRecipeInfo, "p", "timeRequired")
    getId("timeRequired").textContent = "Ready in " + recipe.readyInMinutes + " minutes"
}

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