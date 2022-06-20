const express = require('express');
const router = express.Router();
const book = require('../controllers/book.js');
const auth = require('../middleware/auth.js');

router.post('/bookcreate',auth,book.createBook);

router.get('/books/:value/:page',auth,book.getAllBooks);

router.get('/books/:details/:book_id',auth,book.getBookDetails);




module.exports = router;