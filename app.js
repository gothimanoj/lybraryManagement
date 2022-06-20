const express = require('express');
require('dotenv').config();
const app = express();
  
const bodyParser = require('body-parser');
const connectDB = require('./database/connection.js');
const user = require('./routes/user.js');
const book = require('./routes/book.js');
const admin = require('./routes/admin.js');

connectDB();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api',user);
app.use('/api',book);
app.use('/api',admin);

  
app.listen(process.env.PORT, ()=>{
    console.log(`Server Started at http://localhost:${process.env.PORT}`);
}) 