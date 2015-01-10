var models = require('../models');
var bluebird = require('bluebird');
var mysql = require('mysql');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

var collectData = function(request, callback){
  var data = "";
   request.on('data', function(chunk){
     data += chunk;
   });
   request.on('end', function(){
     callback(JSON.parse(data));
   });
};

var connect = function(queryString, queryArgs, callback){
  var dbConnection = mysql.createConnection({
    user: "root",
    password: "",
    database: "chat"
  });
  dbConnection.connect();

  dbConnection.query(queryString, queryArgs, function(err, results) {
    callback(results);
  });

  dbConnection.end();
};

module.exports = {
  messages: {

    options: function(req, res){
      res.writeHead(200, headers);
      res.end("okay");
    },

    get: function (req, res) {
      var queryString = "SELECT * FROM chat.messages";
      var queryArgs = [];
      connect(queryString, queryArgs, function(results){
        var statusCode = statusCode || 200;
        res.writeHead(200, headers);
        res.end(JSON.stringify({results: results}));
      })

    },
    post: function (req, res) {
      var queryString = "INSERT INTO chat.messages (text, username) VALUES (?, ?)";
        connect(queryString, [req.body.text, req.body.username], function(results){
          var statusCode = statusCode || 200;
          res.writeHead(201, headers);
          res.end(JSON.stringify(results));
        })
    }
  },

  users: {

    options: function(req, res){
      res.writeHead(200, headers);
      res.end("okay");
    },

    get: function (req, res) {
      console.log('get request users');
      var queryString = "SELECT DISTINCT username FROM chat.messages";
      var queryArgs = [];
      connect(queryString, queryArgs, function(results){
        var statusCode = statusCode || 200;
        res.writeHead(200, headers);
        res.end(JSON.stringify({results: results}));
      })
    },
    post: function (req, res) {
      var queryString = "INSERT INTO chat.messages (text, username) VALUES (?, ?)";
        connect(queryString, [req.body.text, req.body.username], function(results){
          var statusCode = statusCode || 200;
          res.writeHead(201, headers);
          res.end(JSON.stringify(results));
        });
    }
  }
};

