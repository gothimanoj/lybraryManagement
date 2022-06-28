const express = require('express');
const router = express.Router();
const user = require('../controllers/user.js');
const auth = require('../middleware/auth.js');
const upload = require('../middleware/multer.js');

router.post('/register',upload.single("profile"),user.register);
router.post('/login',user.login);
router.post("/books/:book_id/issue/:user_id",auth,user.IssueBook);
router.post("/books/:book_id/return",auth,user.ReturnBook);
router.post("/books/:book_id/renew",auth,user.RenewBook);
router.post("/books/details/:book_id/comment",auth,user.NewComment);
router.get("/user/details/allbooks/:user_id",auth,user.getAllBooks);
router.post("/books/details/:book_id/:comment_id", auth, user.UpdateComment);
router.get("/users/books/:page",auth,user.SearchBook);
router.get("/books/details/user/search",auth,user.getByIdBooks);







module.exports = router;