//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

    var crypto = req.body.crypto;
    var fiat = req.body.fiat;

    var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
    var finalUrl = crypto + fiat;

    request(baseUrl + finalUrl, function(error, response, body) {

      var data = JSON.parse(body);
      var price = data.averages.day;
      var currentDate = data.display_timestamp;
      const resultValueContent = price + " " + fiat;

      res.render("result", {dateResult: currentDate, valueResult: resultValueContent, cryptoResult: crypto});

  });

});


app.listen(3000, function() {
  console.log("Server Running on Port 3000.");
});
