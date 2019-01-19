//pseudo code for Liri
require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

//track user input via command line input
var userCommand = process.argv[2];
console.log(userCommand);

var userInput;

function formatUserInput() {
  userInput = process.argv[3];
  for (var i = 4; i < process.argv.length; i++) {
    console.log(process.argv[i]);
    userInput = userInput + " " + process.argv[i];
  }
}

formatUserInput();

var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

function getMusicData(userInput) {
  spotify.search({ type: "track", query: userInput }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    // console.log(data);

    var results = data.tracks.items[0];
    console.log(`
             ########################
             Artist: ${results.artists[0].name}
             Song: ${results.name}
             Link: ${results.href}
             Album: ${results.album.name}
             ########################
`);
  });
}

//Bands In Town
function getBandsInTown(userInput) {
  var url =
    "https://rest.bandsintown.com/artists/" +
    userInput +
    "/events?app_id=codingbootcamp";
  //using axios to get the bands data
  axios.get(url).then(function(bandData) {
    var convertedDate = moment(bandData.data[0].datetime, "YYYY-MM-DD").format(
      "MM/DD/YYYY"
    );
    //once data is received, display the data
    console.log(`
      #############################################
      Name of Venue: ${bandData.data[0].venue.name}
      Location: ${
        bandData.data[0].venue.city
      }, ${bandData.data[0].venue.country}
      Date: ${convertedDate}
      #############################################
    `);
  });
}

//OMDB

function getMovieData(userInput) {
  if (userInput === undefined) {
    //search for a movie called "Mr. Nobody"
    var omdbURL = "http://www.omdbapi.com/?apikey=trilogy&t=Mr.Nobody";
  } else {
    var omdbURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + userInput;
  }

  axios
    .get(omdbURL)
    .then(function(movieData) {
      console.log(`
  #############################
    * Movie title is: ${movieData.data.Title}
    * Year released: ${movieData.data.Year}
    * IMDB Rating: ${movieData.data.Ratings[0].Value}
    * Rotten Tomatoes Rating: ${movieData.data.Ratings[1].Value}
    * Country of Production: ${movieData.data.Country}
    * Language: ${movieData.data.Language}
    * Plot: ${movieData.data.Plot}
    * Actors: ${movieData.data.Actors}
  #############################
  `);
    })
    .catch(function(err) {
      console.log("ERROR");
      console.log(err);
    });
}

//do what it says

function doWhatItSays(userInput) {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");

    var userCommand = dataArr[0];
    var userInput = dataArr[1];
    theUserSearch(userCommand, userInput);
  });
}

function theUserSearch(userCommand, userInput) {
  switch (userCommand) {
    case "concert-this":
      getBandsInTown(userInput);

      break;
    case "spotify-this-song":
      getMusicData(userInput);

      break;
    case "movie-this":
      getMovieData(userInput);

      break;
    case "do-what-it-says":
      doWhatItSays(userInput);
      break;

    default:
      console.log(
        "I don't know what to do because you haven't told me what to do."
      );
  }
}

theUserSearch(userCommand, userInput);
