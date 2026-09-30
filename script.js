// create a global variable to store movies
let movies;

// fetch data when the website first loads
fetch("DataCollection(Sheet1).json")
    .then(response => response.json())
    .then(json => {
        console.log(json);
        movies = json;
        // generate every movie
        for (let i = 0; i < movies.length; i++) {
            let movie = movies[i];
            makeMovie(movie);
        }
    })

    .catch(error => console.log("error", error));

// function for generating movie cards
function makeMovie(movie) {
    let moviesSection =
        document.querySelector("#movies");
    let newMovie =
        document.createElement("article");
    newMovie.classList.add("card");

    // create image filename
    let imageName = getImageName(movie.Movies);
    newMovie.innerHTML = `
        <img
            class="movieCover"
            src="assets/${imageName}"
            alt="${movie.Movies} movie poster"
        >

        <h2 class="movieTitle">
            ${movie.Movies}
        </h2>

        <div class="movieDetails">
            <span>${movie["Release Year"]}</span>
            <span>${movie.Director}</span>
        </div>
    `;

    // create genre list
    let genreList =
        document.createElement("div");
    genreList.classList.add("genres");

    let genres =
        movie.Genre
            .toLowerCase()
            .split(",");

    for (let j = 0; j < genres.length; j++) {
        let genre =
            genres[j].trim();
        genreList.innerHTML += `
            <span>
                ${genre}
            </span>
        `;
    }

    newMovie.appendChild(genreList);
    moviesSection.appendChild(newMovie);
}

// match movie names to image files
function getImageName(title) {
    let imageNames = {

        "The Game Plan":
            "TheGamePlan.png",

        "The Fox and the Hound":
            "TheFoxAndTheHound.jpeg",

        "10 Things I hate about you":
            "10ThingsIhateAboutYou.jpg",

        "Star Wars: The Phantom Menace":
            "StarWarsThePhantomMenace.webp",

        "Star Wars: Attack of the Clones":
            "StarWarsAttackoftheClones.png",

        "Star Wars: Revenge of the Sith":
            "StarWarsRevengeoftheSith.jpg",

        "Star Wars: A New Hope":
            "StarWarsANewHope.jpg",

        "Star Wars: The Empire Strikes Back":
            "StarWarsTheEmpireStrikesBack.jpg",

        "Star Wars: Return of the Jedi":
            "StarWarsReturnoftheJedi.jpg",

        "The Mandalorian and Grogu":
            "TheMandalorianAndGrogu.png",

        "The Parent Trap":
            "TheParentTrap.jpg",

        "13 Going on 30":
            "13GoingOn30.jpg",

        "50 First Dates":
            "50FirstDates.jpg",

        "Just Go With It":
            "JustGoWithIt.webp",

        "Blended":
            "Blended.jpg",

        "My Big Fat Greek Wedding":
            "MyBigFatGreekWedding.jpg",

        "Hotel Transylvania":
            "HotelTransylvania.jpg",

        "Edward Scissorhands":
            "EdwardScissorhands.jpeg",

        "Corpse Bride":
            "CorpseBride.jpg",

        "BeetleJuice":
            "BeetleJuice.jpg",

        "Holiday in Handcuffs":
            "HolidayInHandcuffs.jpg",

        "Project Hail Mary":
            "ProjectHailMary.jpg",

        "Divergent":
            "Divergent.jpeg",

        "Insurgent":
            "Insurgent.jpeg",

        "Allegiant":
            "Allegiant.jpeg",

        "The Maze Runner":
            "TheMazeRunner.jpg",

        "The Maze Runner: The Scorch Trials":
            "TheMazeRunnerTheScorchTrials.jpg",

        "The Maze Runner: The Death Cure":
            "TheMazeRunnerTheDeathCure.jpg",

        "Ratatouille":
            "Ratatouille.jpeg",

        "Are We There Yet?":
            "AreWeThereYet.jpg",

        "Are We Done Yet?":
            "AreWeDoneYet.jpg",

        "Wall-E":
            "Wall-E.jpeg"
    };

    return imageNames[title];
}

// genre filtering
function createGenreFilter(genre) {
    document
        .querySelector(`[data-genre="${genre}"]`)
        .addEventListener("click", function() {
            let moviesSection =
                document.querySelector("#movies");
            moviesSection.innerHTML = "";
            for (let i = 0; i < movies.length; i++) {
                let movie = movies[i];
                let genres =
                    movie.Genre
                        .toLowerCase()
                        .split(",")
                        .map(genre => genre.trim());
                if (
                    genres.includes(genre) ||
                    genre === "all"
                ) {
                    makeMovie(movie);
                }
            }
            let filters =
                document.querySelectorAll(".genreFilter");
            styleFilters(filters, genre);
        });
}

// selected filter styling
function styleFilters(filters, selected) {
    for (let i = 0; i < filters.length; i++) {
        let filter = filters[i];
        if (
            filter.getAttribute("data-genre") === selected
        ) {
            filter.classList.add("selected");
        }
        else {
            filter.classList.remove("selected");
        }
    }
}

// genre list
let genres = [
    "all",
    "comedy",
    "romance",
    "action",
    "adventure",
    "science fiction",
    "fantasy",
    "family",
    "drama",
    "horror",
    "coming of age"
];

for (let i = 0; i < genres.length; i++) {
    createGenreFilter(genres[i]);
}