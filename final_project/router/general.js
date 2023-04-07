const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    if(books[isbn]){
        res.send(JSON.stringify(books[isbn]));
    }else{
        res.send("Book does not exist");
    }
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  var authorExists = false;
    var keys = Object.keys( books );
    for( var i = 0,length = keys.length; i < length; i++ ) {
        const book = books[keys[i]];
        //console.log(book.author);
        if(book.author == author){
            authorExists = true;
          res.send(JSON.stringify(book));
          break;
        }
    }
  if(!authorExists){
    res.send(`Book does not exists for the author -  ${author}`);
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  var titleExists = false;
    var keys = Object.keys( books );
    for( var i = 0,length = keys.length; i < length; i++ ) {
        const book = books[keys[i]];
        console.log(book.title);
        if(book.title == title){
          titleExists = true;
          res.send(JSON.stringify(books[i]));
          break;
        }
    }
  if(!titleExists){
    res.send(`Book does not exists for the title -  ${title}`);
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
    if(books[isbn]){
        res.send(JSON.stringify(books[isbn].reviews));
    }else{
        res.send("Book does not exist");
    }
});

module.exports.general = public_users;

/*

Task 10
const axios = require('axios');

axios.get('https://ramesh12-5000.theiadocker-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

------------------------------------
Task 11

const axios = require('axios');

axios.get('https://ramesh12-5000.theiadocker-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/isbn/2')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

--------------------------------------------
  Task 3
const axios = require('axios');
 axios.get('https://ramesh12-5000.theiadocker-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/author/Samuel Beckett')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  }); 
-----------------------------------------------------
  Task 4

const axios = require('axios');
 axios.get('https://ramesh12-5000.theiadocker-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/title/The Book Of Job')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
*/