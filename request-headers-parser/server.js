var express = require("express")
var app = express();


app.get("/", function(req, res) {
    res.send("Hello World");
})


app.get("/api/whoami", function(req, res) {
    var headers = JSON.parse(JSON.stringify(req.headers));
    var re = /\((.*?)\)/i;
    var whoareyou = new Object();
    whoareyou["ipaddress"] = headers["x-forwarded-for"].split(", ")[0];
    whoareyou["language"] = headers["accept-language"].split(",")[0];
    whoareyou["software"] = headers["user-agent"].match(re)[1];
    // console.log(headers);
    res.send(whoareyou);
})



app.listen(8080, function() {
    console.log("Listening on port 8080")
})