var models = require('../models');
var bluebird = require('bluebird');
var mysql = require('mysql');
var path      = require("path");
var Sequelize = require("sequelize");

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

var sequelize = new Sequelize("chat", "root", "", {dialect: "mysql"});
var User = sequelize.define('User', {
  username: Sequelize.STRING
});
var MessageBox = sequelize.define('MessageBox', {
  userid: Sequelize.STRING,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});
User.sync();
MessageBox.sync();


module.exports = {
  messages: {

    options: function(req, res){
      res.writeHead(200, headers);
      res.end("okay");
    },

    get: function (req, res) {

      MessageBox.sync().success(function() {
        MessageBox.findAll().success(function(msgs) {
          var results = [];
          for (var i = 0; i < msgs.length; i++) {
            results.push(msgs[i].dataValues);
          }
          res.writeHead(200, headers);
          res.end(JSON.stringify({results: results}));
        });
      });
    },
    post: function (req, res) {

      MessageBox.sync().success(function() {
        var newMessage = MessageBox.build({userid: req.body.username, text: req.body.text});
        newMessage.save().success(function(results) {
          console.log(JSON.stringify(results));
          res.writeHead(201, headers);
          res.end(JSON.stringify(results));
        });
      });
    }
  },

  users: {

    options: function(req, res){
      res.writeHead(200, headers);
      res.end("okay");
    },

    get: function (req, res) {
      User.sync().success(function() {
        User.findAll().success(function(usrs) {
          var results = [];
          for (var i = 0; i < usrs.length; i++) {
            results.push(usrs[i].dataValues);
          }
          res.writeHead(200, headers);
          res.end(JSON.stringify({results: results}));
        });
      });

    },
    post: function (req, res) {

      User.sync().success(function() {
        var newUser = User.build({username: req.body.username});
        newUser.save().success(function(results) {
          res.writeHead(201, headers);
          res.end(JSON.stringify(results));
        });
      });

    }
  }
};

