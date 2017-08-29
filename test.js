//Twitter request
function twitter() {
    //attached twitter keys
    var T = new twit(keys)

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
            // console.log("############################################################");

        };
    };
}


inquirer.prompt([

        {
            type: "input",
            name: "song",
            message: "What song would you like to search?"
        }
    ]).then(function(inquirerResponse) {

        }