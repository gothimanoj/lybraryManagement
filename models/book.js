const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
   title : String,
   ISBN : String,
   stock : Number,
   author : String,
   description : String,
   category : String, 
   comments : [{
       type : mongoose.Schema.Types.ObjectId,
       ref : "Comment",
    }],
});
const bookModel = mongoose.model('Book', bookSchema);

module.exports =   bookModel;