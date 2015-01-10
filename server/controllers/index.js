var models = require('../models');
var bluebird = require('bluebird');
var mysql = require('mysql');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  //'Content-Type': "text/plain"
};

var connect = function(callback){
  var dbConnection = mysql.createConnection({
    user: "root",
    password: "",
    database: "chat"
  });
  dbConnection.connect();

  dbConnection.query(queryString, queryArgs, function(err, results) {
    callback(results);
  }

  dbConnection.end();
};

module.exports = {
  messages: {
    get: function (req, res) {
      var queryString = "SELECT * FROM messages";
      var queryArgs = [];

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var queryString = "SELECT * FROM messages";
      var queryArgs = [];
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      var queryString = "SELECT DISTINCT username FROM messages";
      var queryArgs = [];
      connect(function(results){
        var statusCode = statusCode || 200;
        res.writeHead('headers', 200);
        res.end(results);
      })
    },
    post: function (req, res) {
      var queryString = "SELECT * FROM messages";
      var queryArgs = [];
    }
  }
};

