//pseudo code for Liri

//Go to API's and get data and console log it by using command line arguments

//make some variables

//LIRI will search Spotify for songs       Go to Spotify to get music data

var Spotify = require('node-spotify-api');
var omdb = require('omdb');
var bit = require('bit_js');
 
var spotify = new Spotify({
  id: "",
  secret: ""
});

function getMusicData(){
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
}

getMusicData();

//Bands In Town
var options = {
  'artist': 'skrillex',
  'app_id': 'my_app_id',
};

var optionsEvents = {
  'artist': 'skrillex',
  'app_id': 'my_app_id',
  'daterange': '2017-09-20',
}

var callback = function(data) {
  console.log(data)
}


bit.bitGetArtist(options, callback);
bit.bitGetArtistEvents(optionsEvents, callback);

//OMDB

var omdbAPIkey = "bc386333";
var omdbUrl = "http://www.omdbapi.com/?apikey=" + omdbAPIkey + "&";

omdb.get({ title: 'Saw', year: 2004 }, true, function(err, movie) {
  if(err) {
      return console.error(err);
  }

  if(!movie) {
      return console.log('Movie not found!');
  }

  console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
  console.log(movie.plot);

});


    //the purpose of Package JSON is to track packages or code that we use or install



//create LIRI command that searches. ex: node liri concert-this "muse" shows the concerts    
//ex: node liri spotify-this-song "Hit me baby one more time" logs the artist, song name, album, and preview song
//ex: 

