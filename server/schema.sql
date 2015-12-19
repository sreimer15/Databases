CREATE DATABASE chat;

USE chat;


CREATE TABLE users ( 
-- users have many messages
  
  id int AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  -- messsages belong to one user
  
  id int AUTO_INCREMENT NOT NULL,
  userid int NOT NULL,
  text VARCHAR(100) NOT NULL,
  Roomname VARCHAR(50),
  PRIMARY KEY (id)
  -- FOREIGN KEY (userid) REFERENCES users(id)
);




/* Create other tables and define schemas for them here! */

--         USERS
-- ID     1
-- name    Allan


--           messsages    message2
-- id          1             2
-- content       'blah'      'hello'
-- users    User id: 1      USER id: 1
-- Roomname   NULL


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

