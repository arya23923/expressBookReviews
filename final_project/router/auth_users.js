const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{
  let validity;
    users.filter(user => {
        if(user.username === username){
            validity = true;
        }
    });
    return validity;
}

const authenticatedUser = (username,password)=>{
  users.filter(user => {
    if(user.username === username && user.password === password){
        return true;
    }
    else{
        return false;
    }
})
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
