var db = require('../db/index.js');

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "");
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = sequelize.define('users',
  { name: Sequelize.STRING },
  { timestamps: false }
);

var Message = sequelize.define('messages', {
  userid: Sequelize.INTEGER,
  text: Sequelize.STRING,
  Roomname: Sequelize.STRING
  },
  {timestamps: false}
);

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */

//  User.hasMany(Message);
//  Message.belongs(ToUser);

module.exports = {
  messages: {
    get: function (callback) {
      //this is where you do all the db queries
      //callback(result of db)
        Message.sync().then(function(){
          Message.findAll().then(function(messages){
            callback(messages);
          });
        })
      
        
      // db.query('SELECT * FROM messages', function(err,result){
      //   if (err) throw err;
      //   callback(result)
      // });
    }, // a function which produces all the messages
    post: function (req,callback) {

      var username = req.body.username;
      var message = req.body.message;
      var roomname = req.body.roomname;

      User.sync().then(function(){
       User.findAll({where: {name: username} })
        .then(function(data){
          var userid = data[0].id;
          var finalData = {userid: data[0].id, text: message, Roomname: roomname}
          Message.create(finalData).then(function(){
            callback();
          });
        }) 
       
      })
      // db.query('SELECT id FROM users WHERE name = ?', username, function(err,result){
        
      //   if (err) throw err;
      //   var dataArray = [result[0].id ,message, roomname]  ;
      //   db.query('INSERT INTO messages (userid, text, Roomname) VALUES (?,  ?,  ?)', dataArray , function(err, result){
      //     if (err) throw err;
      //       callback();
      //   });      
      // });


    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

