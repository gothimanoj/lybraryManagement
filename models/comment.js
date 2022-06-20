const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text : String,
    author :{
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        },
        username : String,
    },
    
    book : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Book",
        },
        title : String,
    },
    
    date : {type : Date, default : Date.now()},
});

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports =  CommentModel;