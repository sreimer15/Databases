var models = require('../models');
var bluebird = require('bluebird');
var dbConnection = require('../db/index.js');
var mysql = require('mysql');

headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "Origin, X-Requested-With, content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Access-Control-Allow-Credentials": true,
  'Content-Type': "application/json"
};

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(data){        
        res.writeHead(200, 'Succesful');
        res.end(JSON.stringify(data));
      })

      // var testmessage = {
      //   username: "Allan",
      //   text: "hi"
      // }
      // res.writeHead(200, headers);
      // res.end(JSON.stringify({results:[testmessage]}));
    }, // a function which handles a get request for all messages

    post: function (req, res) {
      models.messages.post(req, function(){
        res.writeHead(201, 'created');
        res.end();
      })

    
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      var value = req.body.username;
      dbConnection.query('INSERT INTO users (name) VALUES (?)',value , function(err, result){
        if (err) throw err;
     
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

