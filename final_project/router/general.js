const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  let formatted_books = JSON.stringify(books, null, 4);
  return res.status(200).send(formatted_books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
    if(books[isbn]){
        return res.status(200).send(books[isbn]);
    }
    else{
        return res.status(404).json({message : "book with isbn not found"});
    }
 });

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let author = req.params.author;
  const result = [];

  // Loop through books to find matching authors
  for (let i = 1; i <= Object.keys(books).length; i++) {
      if (books[i].author === author) {
      result.push(books[i]); // Collect matching books
      }
  }

  // Check if any book was found
  if (result.length > 0) {
      return res.status(200).json(result); // Return all matching books
  } else {
      return res.status(404).json({ message: "No books found for the given author" });
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title; // Retrieve the title from request parameters
    const result = [];

    // Loop through books to find matches by title
    for (let i = 1; i <= Object.keys(books).length; i++) {
        if (books[i].title === title) {
        result.push(books[i]); // Collect matching books
        }
    }

    // Check if any book was found
    if (result.length > 0) {
        return res.status(200).json(result); // Return matching books
    } else {
        return res.status(404).json({ message: "No books found with the given title" });
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
