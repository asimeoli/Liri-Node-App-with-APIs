var request = require("./package.json/node_modules/request");
var inquirer = require("./package.json/node_modules/inquirer");
var twit = require("./package.json/node_modules/twit")
var keys = require("./keys");
var Spotify = require("./package.json/node_modules/node-spotify-api");
var fs = require("./package.json/node_modules/file-system");



//Twitter request
function twitter() {
    //attached twitter keys
    var T = new twit(keys)
    //look an object!
    var params = {
        screen_name: 'ann_bootcamp',
        count: 20
    }

    T.get('statuses/user_timeline', params, gotData);

    function gotData(err, data, response) {
        var tweets = data;
        for (var i = 0; i < tweets.length; i++) {
            console.log("############################################################");
            console.log(data[i].text);
            console.log(data[i].created_at);

        };
    };
}

//do-what-it-says
function runText() {
    fs.readFile("random.txt", "utf8", function(err, data) {

        var data = data.split(",");
        var song = data[1];

        //run the search 
        runTextSong(song);

        function runTextSong(song) {
            var spotify = new Spotify({
                id: "23d4f43f6f2e45d3be3d2a43d1e639c2",
                secret: "08debe914cc2428b968d9e13504363b7"
            });

            var songName = song;
            var paramsS = {
                type: "track",
                query: songName

            };
            spotify.search(paramsS, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("############################################################");
                console.log(data.tracks.items[0].artists[0].name);
                console.log(data.tracks.items[0].name);
                console.log(data.tracks.items[0].album.name);
                console.log(data.tracks.items[0].preview_url);
                console.log("############################################################");


            });
        }
    })

}

//Spotify request
function spotifyApp() {
    inquirer.prompt([

        {
            type: "input",
            name: "song",
            message: "What song would you like to search?"
        }
    ]).then(function(inquirerResponse) {

        var spotify = new Spotify({
            id: "23d4f43f6f2e45d3be3d2a43d1e639c2",
            secret: "08debe914cc2428b968d9e13504363b7"
        });

        var defaultSong = "The Sign, Ace of Base";
        var songName = "";
        var paramsS = {
            type: "track",
            query: songName + inquirerResponse.song || songName + defaultSong
        };

        spotify.search(paramsS, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("############################################################");
            console.log(data.tracks.items[0].artists[0].name);
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].album.name);
            console.log(data.tracks.items[0].preview_url);
            console.log("############################################################");
        });
    });
}


//OMBD Request
function movie() {
    inquirer.prompt([

        {
            type: "input",
            name: "movie",
            message: "What movie would you like to search?"
        }
    ]).then(function(inquirerResponse) {
        var defaultMovie = "The Fifth Element";
        var movieName = "";
        movieName = movieName + inquirerResponse.movie || movieName + defaultMovie;
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=40e9cece";
        request(queryUrl, function(error, response, body) {

            if (!error && response.statusCode === 200) {
                //Result to display = 
                console.log("############################################################");
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
                console.log("Rotten Tomatoes Rating :" + JSON.parse(body).Ratings[1].Value);
                console.log("Country of Origin: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("############################################################");

            };
        });
    });

}


//Choose what to run
inquirer.prompt([

        {
            type: "list",
            message: "What can I get you?",
            choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "command"
        }

    ])

    .then(function(inquirerResponse) {

        //What to do with the choice
        //switch statement
        switch (inquirerResponse.command) {
            case "my-tweets":
                twitter();
                break;

            case "spotify-this-song":
                spotifyApp();
                break;

            case "movie-this":
                movie();
                break;

            case "do-what-it-says":
                runText();
                break;
        }
    });