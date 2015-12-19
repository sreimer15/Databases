var db = require('../db/index.js');




module.exports = {
  messages: {
    get: function (callback) {
      //this is where you do all the db queries
      //callback(result of db)      
      db.query('SELECT * FROM messages', function(err,result){
        if (err) throw err;
        callback(result)
      });
    }, // a function which produces all the messages
    post: function (req,callback) {

      var username = req.body.username;
      var message = req.body.text;
      var roomname = req.body.roomname;    
      db.query('SELECT id FROM users WHERE name = ?', username, function(err,result){
        
        if (err) throw err;
        var dataArray = [result[0].id ,message, roomname];
        db.query('INSERT INTO messages (userid, text, Roomname) VALUES (?,  ?,  ?)', dataArray , function(err, result){
          if (err) throw err;
            callback();
        });      
      });


    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

