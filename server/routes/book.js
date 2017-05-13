const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
let Book = require('../models/book');


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Test Route Time: ', Date.now());
  next();
})
router.use(function timeLog (req, res, next) {
  console.log('/', req.method);
  next();
})
/* GET api listing. */
router.get('/', getBooks);
router.post('/', postBook);
router.get('/:id', getBook);
router.delete('/:id', deleteBook);


/*
 * GET /book route to retrieve all the books.
 */
function getBooks(req, res) {
  console.log("getting books");
    //Query the DB and if no errors, send all the books
    let query = Book.find({});
    let promise = query.exec();
    promise.then(books => {
        console.log("hello");
        //If no errors, send them back to the client
        res.json(books);
    }).catch(err =>{
       res.send(err);
    })
}
function postBook(req, res) {
    //Creates a new book
    var newBook = new Book(req.body);
    //Save it into the DB.
    newBook.save((err,book) => {
        if(err) {
            res.status(404);
            res.send(err);
        }
        else { //If no errors, send it back to the client
            res.json({message: "Book successfully added!", book });
        }
    });
}

/*
 * GET /book/:id route to retrieve a book given its id.
 */
function getBook(req, res) {
    console.log(req.params)
    Book.findById(req.params.id, (err, book) => {
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(book);
    });     
}


function deleteBook(req, res) {
    console.log(req.params.id)
    Book.remove({_id : req.params.id}, (err, result) => {
        res.json({ message: "Book successfully deleted!", result });
    });
}

module.exports = router;