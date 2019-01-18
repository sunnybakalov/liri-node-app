//pseudo code for Liri
var Spotify = require('node-spotify-api');
var axios = require('axios');

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
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
}

// getMusicData();

//Bands In Town

function getBandsInTown() {
  var url = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
  //using axios to get the bands data
  axios.get(url).then(function(bandData){
    console.log("band data is here");
    console.log(bandData.data[0]);
    //once data is received, display the data
    console.log(`
      Name of Venue: ${bandData.data[0].venue.name}
      Location: ${bandData.data[0].venue.city}, ${bandData.data[0].venue.country}
      Date: ${bandData.data[0].datetime}
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

    break;

  default:
    break;
}
