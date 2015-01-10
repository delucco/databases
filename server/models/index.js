var db = require('../db');
var Sequelize = require("sequelize");
var controllers = require('../controllers');
var path      = require("path");



module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

