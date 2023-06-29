// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

// Timestamp Microservice
const datePath = "/api/:date?";

const gettingDate = (req, res, next) => {
  let strParam = req.params.date;
  
  if (strParam) {
    let paramIsInt = /^\d+$/.test(strParam);
    req.date = paramIsInt ? new Date(parseInt(strParam)) : new Date(strParam);
  } else {
    req.date = new Date();  
  }
  
  next();
}

const dateHandler = (req, res) => {
  if (req.date.toString() === "Invalid Date") {
    let errObj = {
      "error": "Invalid Date"
    };
    
    res.json(errObj);
  } else {
    let resObj = {
      "unix": req.date.getTime(),
      "utc": req.date.toUTCString()
    };
    
    res.json(resObj);
  }
}

app.get(datePath, gettingDate, dateHandler)

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
