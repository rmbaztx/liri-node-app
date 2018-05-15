// errors or features to continue developing;
    // Twitter API provides results, but way too much content
    // limit the fields that are included in tweets
    // I only want "text" and "created at"

    // movie-this OK, except for Rotten Tomatoes rating

    // Spotify not working: I get results, but how to see what they are?

require("dotenv").config();

// will also need to do the following for Twitter
// npm install twitter in the same directory as app - done

var Twitter = require('twitter');
// will also need to do the following for Spotify
// npm install --save node-spotify-api in the same directory as the app and then require

var Spotify = require('node-spotify-api');
// will aslo need to do the following for Request
// npm install request
var request = require("request");
// will also need dotenv
// npm install dotenv --save
// I think we need file system near the end of the specs
var fs = require("fs");

// 9. Add the code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys");  
// * You should then be able to access your keys information like so
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
//   ```
console.log("Your choices are: ");
console.log("node liri.js my-tweets");
console.log("node liri.js spotify-this-song '<song name here>'");
console.log("node liri.js movie-list '<movie name here>'");
console.log("node liri.js do-what-it-says");
console.log("");
// 10. Make it so liri.js can take in one of the following commands:
var command=process.argv[2];
switch(command) {
	case "my-tweets":
        console.log(command);
        var params = {screen_name:  'aztx_student',count:20};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
        console.log(tweets);
        //console.log(JSON.parse(tweet).created_at);
        //console.log(response);
    }
    });
		break;
	case "spotify-this-song":
        console.log(command);
        spotify
        .request("https://api.spotify.com/v1/tracks/")
        .then(function(data) {
            console.log(data); 
        })
        .catch(function(err) {
            console.error("Error occurred: " + err); 
        });
        
        // // spotify.search({ type: 'track', query: song }, function(err, data) {
        // if (err) {
        //     return console.log('Error occurred: ' + err);
        // }
        
        // console.log(data); 
        // });
        break;
    case "movie-this":
        console.log(command);
        var nodeArgs = process.argv;
        // Create an empty variable for holding the movie name
        var movieName = "";

        // Loop through all the words in the node argument, starting with 3
        // And do a little for-loop magic to handle the inclusion of "+"s
        for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        }
        else {
            movieName += nodeArgs[i];
        }
        }
        console.log(movieName);
        // Then run a request to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        // This line is just to help us debug against the actual URL.
        console.log(queryUrl);

        request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover Title, Year, imdbRating, "Rotten Tomatoes?", //Country, Language, // Plot, Actors
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it)
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            //console.log("Rotten Tomatoes Rating: " + JSON.parse(Ratings)[1].nameOfPropertyExactMatch);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
        });
        break;
    case "do-what-it-says":
        console.log(command);
        // fs.readFile("random.txt","utf8", function(error, data) {
        //     if (error) {
        //         return console.log(error);
        //       }
        //         song=data;
        //       });
        // console.log(song);
        // spotify.search({ type: 'track', query: song }, function(err, data) {
        //     if (err) {
        //         return console.log('Error occurred: ' + err);
        //     }
        //     console.log(data); 
        //     });
        spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
          console.log(data); 
          });
        break;
}
// following is from npm-Twitter (sample code)

// });
// also from npm-Twitter for a search:
// client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
//     console.log(tweets);
//  });
// following is from ndm-spotify-api (sample code)
// spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });
