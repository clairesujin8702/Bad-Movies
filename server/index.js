var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var app = express();
var { ReadAll, ReadOne, Create, Delete } = require("../db/sql");
var { Search, Genre } = require("./helpers/apiHelpers.js");

//Middleware
app.use(bodyParser.json());

// Due to express, when load page, not make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + "/../client/dist"));

/*
Use the routes below to build your application:
|      URL         | HTTP Verb |  Result                                                     |
| :------------:   | :-------: |------------------------------------------------------:      |
|     /genres      |   GET     |  Respond with JSON of all genres                            |
|     /search      |   GET     |  Respond with JSON of all movies by the selected genre      |
|     /save        |   POST    |  Save selected movie as favorite                            |
|     /delete      |   POST    |  Remove selected movie as favorite                          |
        { adult: false,
          backdrop_path: null,
          genre_ids: [ 10749, 28, 18 ],
          id: 780992,
          original_language: 'en',
          original_title: 'Carpe Millennium',
          overview: "New Year's Eve, the last hours",
          popularity: 0.84,
          poster_path: null,
          release_date: '2010-04-08',
          title: 'Carpe Millennium',
          video: false,
          vote_average: 0,
          vote_count: 0
        }
*/

//OPTION 1: Use regular routes;
app.get("/genres", function(req, res) {
  // all genre_axios request : get all movies from api(https://api.themoviedb.org/3/genre/movie/list)
  console.log("/genres : working")

  Genre()
    .then(movies => res.json(movies))
    .catch(err => console.log(err))
});

app.get("/search", function(req, res) {
  // one genre : get all movie with Name of "genre" from api(https://api.themoviedb.org/3/discover/movie)
  // sort them by votes (worst first) using search parameters in themoviedb API to render web directly not to save it to db
  // console.log("/search : ", req.query.genreId)

  Search(req.query.genreId)
    .then(movies => res.json(movies))
    .catch(err => console.log(err))
});

app.get("/favorites", function(req, res) {
  //save movie as favorite into the database
  console.log("/favorites : working")

  ReadAll()
    .then(result=> res.status(200).send(result))
    .catch(err => res.status(500).send(err))
});

app.post("/save", function(req, res) {
  //save movie as favorite into the database
  // const {title, overview, poster_path, genre_ids, popularity} = req.body.favoriteMovie
  // console.log("/save : ", req.body)

  // Create(title, overview, poster_path, genre_ids, popularity)
  Create(req.body)
    .then(result=> res.status(200).send(result))
    .catch(err => res.status(500).send(err))
});

app.post("/delete", function(req, res) {
  //remove movie from favorites into the database
  console.log("/delete???? : ", req.body)

  Delete( req.body.id )
    .then(result=> res.status(200).send(result))
    .catch(err => res.status(500).send(err))
});

// //*********************************************************************
// //OPTION 2: Use Express Router (under /server/routes/movieRoutes.js)

// //Routes
// const movieRoutes = require("./routes/movieRoutes.js");

// //Use routes
// app.use("/movies", movieRoutes);

app.listen(3000, function() {
  console.log("listening on port 3000!");
});
