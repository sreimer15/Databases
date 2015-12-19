var models = require('../models');
var bluebird = require('bluebird');
var dbConnection = require('../db/index.js');
var mysql = require('mysql');


module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) {
      var username = req.body.username;
      var queryString = "SELECT id FROM users WHERE name = " + username;
      var message = req.body.message;
      var roomname = req.body.roomname;
      var dataArray = [queryString,message, roomname];
      dbConnection.query('INSERT INTO messages (userid, text, Roomname) VALUES (?,  ?,  ?)', dataArray , function(err, result){
        if (err) throw err;
        console.log(result);
        res.writeHead(201, 'created');
        res.end();
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      var value = req.body.username;
      dbConnection.query('INSERT INTO users (name) VALUES (?)',value , function(err, result){
        if (err) throw err;
        console.log(result);
        res.writeHead(201, 'created');
        res.end();
      });
    }
  }
};


//   db.Connection.query('INSERT INTO users (username) VALUES (? ? ?)', ["Allan", "Hi", "lobby"] , function(err, result){

//   })
// //INSERT INTO table (column ) VALUES (value);

// INSERT INTO users (username) VALUES ('Allan');

// INSERT INTO users (username, text, roomname) VALUES (? , ? , ?);

