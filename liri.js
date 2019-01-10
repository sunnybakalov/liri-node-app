//pseudo code for Liri

//Go to API's and get data and console log it by using command line arguments

//import packages & keys
// var spotify = require('node-spotify-api');
// var omdb = require('node-omdb-api');
// var bandsInTown = require('node-bandsintown-api');

//make some variables

//LIRI will search Spotify for songs       Go to Spotify to get music data

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
//   id: <your spotify client id>,
//   secret: <your spotify client secret>
});

// function getMusicData(){
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
// }

//LIRI will search Bands in Town for concerts        get concert info


//LIRI will search OMDB for movies         get movie



    //the purpose of Package JSON is to track packages or code that we use or install



//create LIRI command that searches. ex: node liri concert-this "muse" shows the concerts    
//ex: node liri spotify-this-song "Hit me baby one more time" logs the artist, song name, album, and preview song
//ex: 


