var dummyRecipeUrl = "https://api.spoonacular.com/recipes/random?number=1&fab4&addRecipeInformation=true&fillIngredients=true&apiKey=f59f88cb8fbf4ac0b0c99e345526552a";
var dummyRecipeUrlNoKey = "https://api.spoonacular.com/recipes/random?number=1&fab4&addRecipeInformation=true&fillIngredients=true&apiKey=";
var dummyMovieUrl = "https://omdbapi.com/?apikey=48a5261b&t=star%20wars";
var gianniApiKey = "6b1663d8d8c04fd69200905f3c895ee5"
var jenniferApiKey = "f59f88cb8fbf4ac0b0c99e345526552a"
var janayApiKey = "d509b30dc9334ed1b6d3aa1f61ece62b"
var jeremyApiKey = "646a3c17f65f48eb8dc89229bd07fab4"

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


var cuisine = [
    "African",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European	",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
]

var cuisineEl = getId("cuisine")
for (var i = 0; i < cuisine.length; i++){
    createElement(cuisineEl, "option", cuisine[i])
    getId(cuisine[i]).textContent = cuisine[i]
}

var diet = [
    "gluten free",
    "ketogenic",
    "vegetarian",
    "lacto-vegetarian",
    "ovo-vegetarian",
    "vegan",
    "pescetarian",
    "paleo",
    "primal",
    "whole30"
]

var dietEl = getId("diet")
for (var i = 0; i < diet.length; i++){
    createElement(dietEl, "option", diet[i])
    getId(diet[i]).textContent = diet[i]
}

var intolerance = [
    "dairy",
    "egg",
    "gluten",
    "grain",
    "peanut",
    "seafood",
    "sesame",
    "shellfish",
    "soy",
    "sulfite",
    "tree nut",
    "wheat"
]

var intoleranceEl = getId("intolerance")
for (var i = 0; i < intolerance.length; i++){
    createElement(intoleranceEl, "option", intolerance[i])
    getId(intolerance[i]).textContent = intolerance[i]
}
createElement(intoleranceEl, "ul", "intoleranceList")
createElement(getId("intoleranceList"), "li", "test")
var test = getId("test")
test.textContent = "test"
createElement(test, "button", "closeTestBtn")
var closeTestBtn = getId("closeTestBtn")
closeTestBtn.textContent = "X"
closeTestBtn.addEventListener("click", function(){
    test.parentNode.removeChild(test)
})





function getRandomInt() {
    return Math.floor(Math.random() * (9000000 - 1000000) + 1000000); //The maximum is exclusive and the minimum is inclusive
    }

// fetches data to be displayed onto the page
fetch(dummyRecipeUrlNoKey + 
    // jeremyApiKey
    jenniferApiKey
    // janayApiKey
    // gianniApiKey
    )
    .then(function(response){
        return response.json();
    })
    .then(data => displayRecipe(data));

// fetch(dummyMovieUrl)
//     .then(function(response){
//         console.log(response)
//         return response.json();
//     })
//     .then(data => displayMovie(data))

    function getRandomInt() {
        return Math.floor(Math.random() * (9000000 - 1000000) + 1000000); //The maximum is exclusive and the minimum is inclusive
      }
      function fetchMovie(id) {
        const randomNumber = getRandomInt();
        fetch(`https://www.omdbapi.com/?apikey=48a5261b&i=tt${id}`)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.Type === 'movie' && response.Genre !== 'adult' && response.Poster !== "N/A") {
                console.log(response)
                displayMovie(response)
              return; // STOP
            }
            console.log('I tried')
            fetchMovie(getRandomInt())
          })
      }
      fetchMovie(getRandomInt());



//displays random movie
function displayMovie(data){
    yourMovieInfo.innerHTML = ""; //clears the innerHTML

    if(data.Poster !== 'N/A'){
    createElement(yourMovieInfo, "img", "moviePoster")
    getId("moviePoster").setAttribute("src", data.Poster)
    }
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

//displays random recipe
function displayRecipe (data) {
    yourRecipeInfo.innerHTML = ""; //clears the innerHTML

    createElement(yourRecipeInfo, "img", "foodImage")
    getId("foodImage").setAttribute("src", data.recipes[0].image)
    createElement(yourRecipeInfo, "h2", "recipeTitle")
    getId("recipeTitle").textContent = data.recipes[0].title
    createElement(yourRecipeInfo, "p", "summary")
    getId("summary").innerHTML = data.recipes[0].summary
    createElement(yourRecipeInfo, "p", "timeRequired")
    getId("timeRequired").textContent = "Ready in " + data.recipes[0].readyInMinutes + " minutes"
}





function saveBtnLocal() {    
    const recipeData = {

        recipeImg: document.getElementById('foodImage').src,
        recipeTitle: document.getElementById('recipeTitle').innerHTML,
        recipeSummary: document.getElementById('summary').innerHTML,
        
    };

    const movieData= {
        movieImg: document.getElementById("moviePoster").src,
        movieTitle: document.getElementById("title").innerHTML,

    }
    
    localStorage.setItem('recipeData', JSON.stringify(recipeData))
    localStorage.setItem('movieData',JSON.stringify(movieData))
 };

 //when click on the 'save to favorites' btn, then should save to local storage and be available on the carousel
document.getElementById("favBtn").addEventListener("click", function(event) {
    event.preventDefault();
    saveBtnLocal();
    console.log("Recipe and Movie saved")
    
});

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

//pushing images to an array so that can grab in the local storage

function setCarousel() {

var imageArr = [];
var recipefromlocal= JSON.parse(localStorage.getItem("recipeData"))  //grabs images from local storage to display at bottom of the page
var moviefromlocal= JSON.parse(localStorage.getItem("movieData"))

imageArr.push(recipefromlocal.recipeImg)
if(moviefromlocal.Poster !== "N/A"){
    imageArr.push(moviefromlocal.movieImg)
}

var containerEl = document.querySelector(".slideshow-container");
containerEl.innerHTML = "";
for(i=0; i<imageArr.length; i++) {
        var newImg = document.createElement("img")
        newImg.setAttribute("src", imageArr[i])

        newImg.setAttribute("class", "imageSize")
        containerEl.appendChild(newImg)
    }

}

setCarousel();

