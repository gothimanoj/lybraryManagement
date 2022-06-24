const express = require('express');
const router = express.Router();
const user = require('../controllers/user.js');
const auth = require('../middleware/auth.js');

router.post('/register',user.register);
router.post('/login',user.login);
router.post("/books/:book_id/issue/:user_id",auth,user.IssueBook);
router.post("/books/:book_id/return",auth,user.ReturnBook);
router.post("/books/:book_id/renew",auth,user.RenewBook);
router.post("/books/details/:book_id/comment",auth,user.NewComment);
router.get("/user/details/allbooks/:user_id",auth,user.getAllBooks);






module.exports = router;