var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

console.log("Hello World");

app.use(function(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
})

/*
app.get("/", function(req, res) {
  res.send("Hello Express");
});
*/

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.use(express.static(__dirname + "/public"));

// app.get("/json", function(req, res) {
//   res.json({"message": "Hello json"});
// });


app.get("/json", (req, res) => {
  var response = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
  response = response.toUpperCase();
};   
  res.json({
    message: response
  })
});

app.get("/now", function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.send({time: req.time});
});

app.get("/:word/echo", function(req, res) {
  const { word } = req.params;
  res.send({echo: word});
})

app.get("/name", function(req, res) {
  var fistname = req.query.first;
  var lastname = req.query.last;
  var {first: firstName, last: lastName} = req.query;
  res.json({
    name: `${firstName} ${lastName}`
  });
});

app.post("/name", function(req, res) {
  var string = req.body.first + " " + req.body.last;
  res.json({
    name: string
  })
})

module.exports = app;
