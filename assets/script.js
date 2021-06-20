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

// {
//     '6/19/2021 1:26:25 PM': {
//         recipe,
//         movie
//     },
//     '6/19/2021 1:29:25 PM': {
//         recipe,
//         movie
//     }    
// }

//fetches both api's for random recipe and random movie and saves to local storage

function saveToLocal(){

    fetch(dummyRecipeUrlNoKey + 
    jeremyApiKey
    // jenniferApiKey
    // janayApiKey
    // gianniApiKey)
    )
    .then(function(response){
        console.log(response)
        return response.json();
    })

    .then(data => {
        var recipeData = {

            recipeImg: `${data.recipes[0].image}`,
            recipeTitle: `${data.recipes[0].title}`,
            recipeSummary: `${data.recipes[0].summary}`,
            recipeTime: `${data.recipes[0].readyInMinutes}`,

        }
        localStorage.setItem("recipeData", JSON.stringify(recipeData));
        return data;
    })
    .then (displayRecipe);

fetch(dummyMovieUrl)
    .then(function(response){
        return response.json();
    })
    .then(data => {
        var MovieData = {

            movieImg: `${data.Poster}`,
            movieTitle: `${data.Title}`,
        
        }
        localStorage.setItem("movieData", JSON.stringify(MovieData));
        console.log(MovieData)
        return data;
    })
    .then (displayMovie);

    var object = {
        "recipeData": recipeData,
        "movieData": movieData,
    }

    localStorage.setItem("data", JSON.stringify(object))
}

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


document.getElementById("randomBtn").addEventListener("click", saveToLocal) //random btn that user clicks to generate random movie and recipe
document.getElementById("closeBtn").addEventListener("click", closeBtn) //close btn on the generated movie/recipe window in order to close and go back to homepage


//as a user when I click on the favorites tab, I want it to redirect to a seperate html page
//on this html page, I want to display all the favorite dates saved to recall in the future
//need to create a local storage to display onto the page


// document.getElementById("favBtn").addEventListener("click", showslides(n)); //when click on the 'save to favorites' btn, then should save to local storage and be available on the favorite's html file



//slideshow JAVASCRIPT//
// <!-- <div class="mySlides fade">
// <div class="numbertext">1 / 3</div>
// <img src="./assets/images/download.jpg" style="width:100%">
// <div class="text">Caption Text</div>
// </div>

// <div class="mySlides fade">
// <div class="numbertext">2 / 3</div>
// <img src="./assets/images/images-1.jpg" style="width:100%">
// <div class="text">Caption Two</div>
// </div>

// <div class="mySlides fade">
// <div class="numbertext">3 / 3</div>
// <img src="./assets/images/images-3.jpg" style="width:100%">
// <div class="text">Caption Three</div>
// </div>

localStorage.setItem('slide1', JSON.stringify({
    numberText: 1,
    imgSrc: './assets/images/download.jpg',
    captionText: 'Caption One'
}))
localStorage.setItem('slide2', JSON.stringify({
    numberText: 2,
    imgSrc: './assets/images/images-1.jpg',
    captionText: 'Caption Two'
}))

var slideIx = localStorage.getItem(`${data.recipes[0].image}`);
if (slideIx === null) {
    slideIx = 1;
}

var slideIndex = slideIx;
showSlides(slideIndex);

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
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

