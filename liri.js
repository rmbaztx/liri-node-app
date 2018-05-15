// errors or features to continue developing;

    // done - Twitter API provides results, but way too much content
    // limit the fields that are included in tweets
    // I only want "text" and "created at"

    // done - movie-this almost OK: I need to figure out 
    // how to print the Rotten Tomatoes rating

    // done - Spotify not right: I get results for one-word titles

    // do-what-it-says: take in a movie titel and search OMDB

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
console.log("node liri.js movie-this '<movie name here>'");
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
        console.log("________tweets_________")
        for (var i = 0;i < tweets.length;i++) {
           console.log("Tweet: " + tweets[i].text); 
           console.log("Created: " + tweets[i].created_at);
        }
        console.log("________tweets_________")
        // console.log(JSON.parse(tweet).created_at);
        /// console.log(response);
    }
    });
		break;
	case "spotify-this-song":
        console.log(command);
        // var song = process.argv[3];
        var nodeArgs = process.argv;
        // Create an empty variable for holding the movie name
        var songName = "";

        // Loop through all the words in the node argument, starting with 3
        // And do a little for-loop magic to handle the inclusion of "+"s
        for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            songName = songName + "+" + nodeArgs[i];
        }
        else {
            songName += nodeArgs[i];
        }
        }
        spotify.search({ type: 'track', query: songName }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
          
        //   console.log(data); 
        //   console.log("\n-----------------------------\n")
          // We only want Artist(s), preview url, album, 
     
            //console.log(JSON.stringify(data.tracks.items[0], null, 3)); 
            console.log("\n\nAlbum Name:  " + data.tracks.items[0].album.name);
            console.log("Artist Name:  " + data.tracks.items[0].artists[0].name);
            console.log("Preview URL:  " + data.tracks.items[0].preview_url);
          //console.log(data.tracks.items[0]);
        //   console.log(data.artists.name[0]);
        //   console.log(data.album.name[0]);
        //   console.log(data.href[0]);
          });
        
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
            console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
        });
        break;
    case "do-what-it-says":
        // design spec: spotify-this-song,"I Want it That Way"
        //  console.log(command);
        fs.readFile("random.txt","utf8", function(error, data) {
            if (error) {
                return console.log(error);
              }
                songName=data;
                console.log(songName);
                
            spotify.search({ type: 'track', query: songName }, function(err, data) {
                if (err) {
                return console.log('Error occurred: ' + err);
                }
            
                console.log("\n\nAlbum Name:  " + data.tracks.items[0].album.name);
                console.log("Artist Name:  " + data.tracks.items[0].artists[0].name);
                console.log("Preview URL:  " + data.tracks.items[0].preview_url);
            });
        });
        // spotify.search({ type: 'track', query: song }, function(err, data) {
        //     if (err) {
        //         return console.log('Error occurred: ' + err);
        //     }
        //     console.log(data); 
        //     });
        
        break;
}
