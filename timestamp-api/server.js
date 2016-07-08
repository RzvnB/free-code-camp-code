var express = require("express")
var app = express();
var dateFormat = require('dateformat');

app.get("/", function(req, res) {
    res.send("Hello World");
})

app.get("/:date", function(req, res) {
    var paramDate = decodeURIComponent(req.params.date);
    var date;
    if(isNaN(parseInt(paramDate))) {
        date = new Date(paramDate);
    } else {
        date = new Date(parseInt(paramDate));
    }
    var toSend = {
        "unix" : null,
        "natural" : null
    }
    if(date instanceof Date && isFinite(date)) {
        toSend["unix"] = date.getTime();
        toSend["natural"] = dateFormat(date, "mmmm dd, yyyy");
    }
    res.send(toSend);
})

app.listen(8080, function() {
    console.log("Listening on port 8080")
})


