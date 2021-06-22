const colorNew = 'ivory';
const colorHistory = 'ivory';
let pageMovies = 1;
var maxDateInLocalStorage = 0;

// Define a new Date-In object
function DateIn(date, imdbID, movieTitle, movieImg, dinnerID, dinnerTitle, dinnerImg){
    this.date = date;
    this.imdbID = imdbID;
    this.dinnerID = dinnerID;
    this.movieTitle = movieTitle;
    this.movieImg = movieImg;
    this.dinnerTitle = dinnerTitle;
    this.dinnerImg = dinnerImg;
}


function fClickNav(menu){
    fResetDisplay();
   // document.getElementById('screenTitle').innerHTML = menu;

        if(menu == 'new'){
            document.getElementById('BtnFindMovie').hidden = false;
            document.getElementById('BtnFindDinner').hidden = false;
            document.getElementById('txtDate').hidden = false;
            document.getElementById('BtnSaveDate').hidden = false;
            document.getElementById('navNew').style.backgroundColor = colorNew;
            document.body.style.backgroundColor = colorNew;
            document.getElementById('navNew').style.color = 'black';

        }else if(menu == 'history'){
            document.body.style.backgroundColor = colorHistory;
            document.getElementById('navNew').style.color = 'black';
            fOpenHistoryModal();
        }
}

function fSearchMovies(){
    const movieListEl = document.getElementById("movieList");
    movieListEl.innerHTML = "";
    let imgEl = document.createElement("div");
    imgEl.setAttribute("id","spinnerEl");
    movieListEl.append(imgEl);
    document.getElementById("spinnerEl").className = "pure-u-1 center-content loader";
    setTimeout('fSearchMoviesNext()',1000);
}

function fSearchMoviesNext(){
    if(pageMovies<1){pageMovies=1;}
    let titleEl = document.getElementById("title");
    let yearEl = document.getElementById("year");
    let typeEl = document.getElementsByName("type");
//    let type = "";

    for(let j=0; j<typeEl.length; j++){
        if(typeEl[j].checked){
            type = typeEl[j].value;
        }
    }
    const apiMovies =  "http://www.omdbapi.com/?apikey=3285264a&s="+titleEl.value+"&type="+type+"&y="+yearEl.value+"&page="+pageMovies;
console.log(apiMovies);
    fetch(apiMovies)
        .then(response => {
            return response.json();
        })
        .then(responseJSON => {fFillMovieList(responseJSON);});
}

function fFillMovieDiv(imdbID){
    const apiMovies =  "http://www.omdbapi.com/?apikey=3285264a&i="+imdbID;
console.log(apiMovies);
    fetch(apiMovies)
        .then(response => {
            return response.json();
        })
        .then(data => {

console.log("---> "+data.Ratings[0].Value.substring(0,2));
            document.getElementById("movieTitle").innerHTML = data.Title;
            document.getElementById("moviePlot").textContent = data.Plot;
            document.getElementById("movieYear").textContent = data.Year;
            document.getElementById("tomatoRatingDiv")
            .textContent = data.Ratings[0].Value;
            document.getElementById("moviePoster").src = data.Poster;
            document.getElementById("moviePoster").dataset.imdbID = imdbID;
            document.getElementById("movieTomatometer").src = "./assets/images/Star.png";
            document.getElementById("movieRated").textContent = data.Rated;
            document.getElementById("movieActors").textContent = data.Actors;
            document.getElementById("movieGenre").textContent = data.Genre;
            document.getElementById("imdbIDHidden").value = imdbID;

          });


    window.location.href='#modal-close';
}


function fFillMovieBig(object){

    const apiMovies =  "http://www.omdbapi.com/?apikey=3285264a&i="+object.dataset.imdbID;
console.log(apiMovies);
    fetch(apiMovies)
        .then(response => {
            return response.json();
        })
        .then(data => {

console.log("---> "+data.Ratings[0].Value.substring(0,2));
            document.getElementById("movieTitle").innerHTML = data.Title;
            document.getElementById("moviePlot").textContent = data.Plot;
            document.getElementById("movieYear").textContent = data.Year;
            document.getElementById("tomatoRatingDiv")
            .textContent = data.Ratings[0].Value;
            document.getElementById("movieBig").src = data.Poster;

          });


    window.location.href='#open-big-movie';
}



function fFillMovieList(data){
    console.log(data.Search);
    const movieListEl = document.getElementById("movieList");
    const liEl = document.createElement("div");
    var html = "";
    for(var i=0;i<data.Search.length;i++){

        const limdbID = data.Search[i].imdbID;
        const lTitle = data.Search[i].Title;
        const lPoster = data.Search[i].Poster;

        html += "<div class='pure-u-sm-1 pure-u-md-1-3 pure-u-lg-1-5  vred text-center' onclick=fFillMovieDiv('"+limdbID+"');>";
      //  html += "<h4 class='center'>"+lTitle+"</h4>";
        html += "<img class='cursorPointer moviePoster' src='"+lPoster+"' alt='who knows?'>";
        html += "</div>";
//


    }
//    fill the list
        movieListEl.innerHTML =html;

}

function fSaveDate(object){
    let dateEl = document.getElementById("txtDate");
    let imdbIDHiddenEl = document.getElementById("imdbIDHidden");
    let dinnerIDHiddenEl = document.getElementById("dinnerIDHidden");

    let dateChoosen = dateEl.value;
    let imdbIDChoosen = imdbIDHiddenEl.value;
    let dinnerIDChoosen = dinnerIDHiddenEl.value;
    let moviePosterEl = document.getElementById("moviePoster");
    let imgDataMoviePoster = getBase64Image(moviePosterEl);
    let movieTitleEl = document.getElementById("movieTitle");
    let movieTitle = movieTitleEl.innerHTML;
    let dinnerTitle = "";
    let dinnerImg = "";

// We create a new Date-In object to be stored in localStorage

    const   newDateIn = new DateIn(dateChoosen, imdbIDChoosen, movieTitle, imgDataMoviePoster, dinnerIDChoosen, dinnerTitle, dinnerImg);

    //Obtain
    let maxDateInLocalStorage = localStorage.getItem("maxDateInLocalStorage");
    if(!maxDateInLocalStorage){ maxDateInLocalStorage = 0;}

    maxDateInLocalStorage ++;

//    Update the DateIn and maxDateInLocalStorage
    localStorage.setItem("maxDateInLocalStorage", maxDateInLocalStorage);
    localStorage.setItem("DateIn_"+maxDateInLocalStorage,JSON.stringify(newDateIn));

    }


    function fResetDisplay(){
        document.getElementById('BtnFindMovie').hidden = true;
        document.getElementById('BtnFindDinner').hidden = true;
        document.getElementById('txtDate').hidden = true;
        document.getElementById('BtnSaveDate').hidden = true;
        console.log("reset display");
        document.body.style.backgroundColor = 'ivory';
        pageMovies = 1;
    }

function fOpenHistoryModal(){

//open localStorage
let maxDateInLocalStorage = localStorage.getItem("maxDateInLocalStorage");

var table = document.getElementById("historyTable");

var numRows = document.getElementById("historyTable").rows.length;

console.log("numRows" + numRows);
for(let i=0; i<numRows-1; i++){
   table.deleteRow(i);
   console.log("row "+ i);

}

    for(let i=1;i<=maxDateInLocalStorage; i++){

        let DateInStr = localStorage.getItem("DateIn_"+i);
//        console.log(DateInStr);
        let DateInObj = JSON.parse(DateInStr);
//        // Add some text to the new cells:

        let td1 = document.createElement("td");
        td1.setAttribute("wrap","no");
        td1.innerHTML = DateInObj.date;
        let td2 = document.createElement("td");
        td2.setAttribute("wrap","no");
        td2.innerHTML = "<img src='data:image/png;base64,"+DateInObj.movieImg+"'  id='movieImage"+i+"' class='history-table-image' >";
        let td3 = document.createElement("td");
        td3.setAttribute("wrap","no");
        td3.innerHTML = DateInObj.movieTitle;

        let tr1 = document.createElement("tr");
        tr1.append(td1);
        tr1.append(td2);
        tr1.append(td3);

        let historyTable = document.getElementById("historyTable");
        historyTable.append(tr1);


//

    }

//    Open Modal
    window.location.href = "#open-history";
}








    fResetDisplay();






























