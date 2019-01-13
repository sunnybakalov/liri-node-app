//pseudo code for Liri

//Go to API's and get data and console log it by using command line arguments

//import packages & keys
// var spotify = require('node-spotify-api');
// var omdb = require('node-omdb-api');
// var bandsInTown = require('node-bandsintown-api');

//make some variables

//LIRI will search Spotify for songs       Go to Spotify to get music data

var spotify = require('node-spotify-api');
var omdb = require('omdb');
var bit = require('bit_js');
 
var spotifyInfo = new Spotify({
  id: "0ccb04d2b75047deb9561d727b1b7a54",
  secret: "5b9aff11bab3406c86b6b59f95a18dfd"
});

function getMusicData(){
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
}

//LIRI will search Bands in Town for concerts        get concert info
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


//LIRI will search OMDB for movies         get movie
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


