var express = require("express");
var imageSearch = require('node-google-image-search');
var app = express();

var searchHistory = [];

app.get("/", function(req, res) {
    res.send("Hello World");
})


app.get("/api/imagesearch/:query", function(req, res) {
    var query = decodeURIComponent(req.params.query);
    var queryArray = query.split("&");
    var searchString = queryArray[0];
    var offset = 0;
    console.log(queryArray.length);
    if(queryArray.length > 1) {
        offset = parseInt(queryArray[1].split("=")[1]);
        if(offset > 9)
            res.send({ "error": "Page not found"});
    }
    registerSearch(searchHistory, { 
                                    "what": searchString,
                                    "when": new Date()
    })
    var results = imageSearch(searchString, function (results) {
        res.send(results.map(function (obj) {
            return {
                "url": obj.link,
                "snippet": obj.snippet,
                "thumbnail": obj.image.thumbnailLink,
                "context": obj.image.contextLink
            }
        }));
    }, offset * 10, 10);
    
})


app.get("/api/latest/imagesearch", function(req, res) {
    res.send(searchHistory);
})

app.listen(8080, function() {
    console.log("Listening on port 8080")
})

function registerSearch(array, obj) {
    if(array.length == 10) {
        array.shift();
        array.push(obj);
    }
    else
        array.push(obj);
}