const axios = require("axios");
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const getAllBooks = () => {
    return books;
  };

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!isValid(username)){
        users.push({"username":username, "password":password})
        return res.status(200).send({message: "user successfully registered"});
    }
    else{
        res.status(404).send({message: "user already registered"})
    }
});

// Get the book list available in the shop
public_users.get('/',async (req, res) => {
    try{
        const allBooks = await getAllBooks;
        return res.status(200).send(JSON.stringify(allBooks, null, 2));
    }
    catch(e){
        return res.status(500).send(e);
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    try{
        const isbn = req.params.isbn;
        return res.status(200).send(books[isbn]);
    }
    catch(error){
        return res.status(404).send(error);
    }
 });

// Get book details based on author
public_users.get('/author/:author',async (req, res) => {
    try{
      const author = req.params.author;
      const allBooks = await getAllBooks();
      let result = [];
      let i = 1;
      for(i = 1; i<= Object.keys(books).length; i++){
          if(allBooks[i].author === author){
              result.push(allBooks[i]);
          }
      }
      return res.status(200).send(result)
    }
    catch(error){
      return res.status(404).send(error);
    }
  });

// Get all books based on title
public_users.get('/title/:title',async (req, res) => {
    try{
      const title = req.params.title; // Retrieve the title from request parameters
      const result = [];
  
      // Loop through books to find matches by title
      for (let i = 1; i <= Object.keys(books).length; i++) {
          if (books[i].title === title) {
          result.push(books[i]); // Collect matching books
          }
      }
      return res.status(200).json(result);
    }
    catch(error){
      res.status(404).send(error);
    }
  });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
    if(books[isbn]){
        return res.status(200).send(books[isbn]);
    }
    else{
        return res.status(404).send({message : "book by index not found"});
    }
});

module.exports.general = public_users;
