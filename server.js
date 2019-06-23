// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// Timestamp endpoint
app.get("/api/timestamp/:date_string", function (req, res) {
  let dateParam = req.params.date_string;
  if (dateParam.indexOf("-") == -1) {
    dateParam = parseInt(dateParam)
  }
  let date = new Date(dateParam);
  console.log("dateParam", dateParam);
  console.log("type", typeof dateParam);
  console.log("date", date);
  console.log("date.getTime()", date.getTime());
  if (date != "Invalid Date") {
    res.json({"unix": date.getTime(), 
              "utc" : date.toUTCString() 
      });
  } else {
    res.json({"error" : "Invalid Date" });
  }
});

// listen for requests :)
var port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});