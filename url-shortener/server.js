var express = require("express");
var crypto = require('crypto');
var validURL = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
var app = express();



var shorURLs = new Object();

app.get("/", function(req, res) {
    res.send("Hello World");
})


app.get("/new", function(req, res) {
    res.send({ "error" : "Invalid URL. Please enter a valid protocol and site."});
})

app.get("/:url", function(req,res) {
    var url = req.params.url;
    if(shorURLs.hasOwnProperty(url)) {
        res.redirect(shorURLs[url]);
    } else {
        res.send("Site not found");
    }
})

app.get("/new/:url*", function(req, res) {
    var url = req.url.slice(5);
    var appURL = "https://freecodecamp-backend-rzvnb.c9users.io/";
    var shortURL; 
    var resJSON = new Object();
    if(isURL(url)) {
        shortURL = crypto.createHash('md5').update(url).digest('hex').substr(0, 5);
        resJSON["original"] = url;
        resJSON["short_url"] = appURL + shortURL;
        shorURLs[shortURL] = url;
        
    } else {
        resJSON["error"] = "Invalid URL. Please enter a valid protocol and site."
    }
    res.send(resJSON);
})



app.listen(8080, function() {
    console.log("Listening on port 8080")
})

function isURL(str) {
    return validURL.test(str);
}