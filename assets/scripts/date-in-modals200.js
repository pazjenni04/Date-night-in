
function fClickNav(menu){
    fResetDisplay();
    document.getElementById('screenTitle').innerHTML = menu;

        if(menu == 'new'){
            document.getElementById('BtnFindMovie').hidden = false;
            document.getElementById('BtnFindDinner').hidden = false;
            document.getElementById('txtDate').hidden = false;
            document.getElementById('BtnSaveDate').hidden = false;
        }
}

function fOpenModalMovies(){
    window.location.href = "#modal-find-movie";
    const apiMovies =  "http://www.omdbapi.com/?i=tt3896198&apikey=3285264a";

    fetch(apiMovies)
        .then(response => {
            console.log("aaaa");
            console.log(response);
            return response.json();
        })
        .then(responseJSON => {
            localStorage.setItem("movieJSON", responseJSON);
            localStorage.setItem("[0]", responseJSON.Title);
            return responseJSON;
        })
        .then (responseJSON => {
            let movies = localStorage.getItem("movieJSON");
            console.log(movies.length);
        })
        .then(fDisplayMovie);
}


function fDisplayMovie(data){
    console.log('fDisplayMovie');

    document.getElementById("movieTitle").innerHTML = data.Title;
    document.getElementById("moviePoster").src = data.Poster;
    document.getElementById("moviePlot").innerHTML = data.Plot;

}





    function fResetDisplay(){
        document.getElementById('BtnFindMovie').hidden = true;
        document.getElementById('BtnFindDinner').hidden = true;
        document.getElementById('txtDate').hidden = true;
        document.getElementById('BtnSaveDate').hidden = true;
        console.log("reset display");
    }

//    includeHTML("filters");
    fResetDisplay();

