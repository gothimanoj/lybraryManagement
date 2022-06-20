const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.js');
// const User = require('../models/user.js');
// const Book = require('../models/book.js');
// const Activity = require('../models/activity.js');
// const Issue = require('../models/issue.js');
// const Comment = require('../models/comment.js');

const AdminCtrl = require('../controllers/admin.js');

router.post('/admin',auth,AdminCtrl.AdminCreateBook);
router.get('/admin',auth,AdminCtrl.getAdmin);


module.exports = router