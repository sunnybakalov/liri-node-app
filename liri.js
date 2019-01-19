//pseudo code for Liri
require('dotenv').config();
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');

//track user input via command line input
var userCommand = process.argv[2];
console.log(userCommand);

var userInput;

function formatUserInput () {
  userInput = process.argv[3];
  for (var i = 4; i < process.argv.length; i++) {
    console.log(process.argv[i]);
    userInput = userInput + " " + process.argv[i];
  }
}

formatUserInput();

console.log("this is user input:", userInput);
 
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

function getMusicData(){
spotify.search({ type: 'track', query: userInput }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

// console.log(data); 

var results = data.tracks.items[0];
console.log(`
             ########################
             Artist: ${results.artist}
             Song: ${results.name}
             Link: ${results.href}
             Album: ${results.album.name}
             ########################
`)
});
}

//Bands In Town
function getBandsInTown() {
  var url = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
  //using axios to get the bands data
  axios.get(url).then(function(bandData){
    console.log("band data is here");
    console.log(bandData.data[0]);
    var convertedDate = moment(bandData.data[0].datetime, "YYYY-MM-DD").format("MM/DD/YYYY")
    //once data is received, display the data
    console.log(`
      Name of Venue: ${bandData.data[0].venue.name}
      Location: ${bandData.data[0].venue.city}, ${bandData.data[0].venue.country}
      Date: ${convertedDate}
    `)
  })
}


//OMDB

function getMovieData() {
  if(userInput === undefined){
    //search for a movie called "Mr. Nobody"
    var omdbURL = "http://www.omdbapi.com/?apikey=trilogy&s=Mr.Nobody";
  } else {
    var omdbURL = "http://www.omdbapi.com/?apikey=trilogy&s=" + userInput;
  }

axios.get(omdbURL).then(function(movieData){
  console.log("Should have movie data");
  console.log(movieData);
  console.log(`
  #############################
    * Movie title is: ${movieData.data.Search[0].Title}
    * Year released: ${movieData.data.Search[0].Year}
  #############################
  `)
})
  .catch(function(err){
    console.log("ERROR");
    console.log(err);
  })

}

//do what it says

function doWhatItSays () {
  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");

  })
}

switch (userCommand) {
  case "concert-this":
    console.log("concert-this is running");
    getBandsInTown();

    break;
  case "spotify-this-song":
    console.log("spotify-this-song is running");
    getMusicData();

    break;
  case "movie-this":
  console.log("movie-this is running");
    getMovieData();

    break;
  case "do-what-it-says":
  console.log("do-what-it-says is running")
    doWhatItSays ()
    break;

  default:
  console.log("I don't know what to do because you haven't told me what to do.")

}
