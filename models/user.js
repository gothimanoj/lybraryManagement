const mongoose = require("mongoose")
  
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: String,
  joined: { type: Date, default: Date.now() },
  bookIssueInfo: [
    {
      book_info: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Issue",
        },
      },
    },
  ],
   
  address: String,
   
  violationFlag: { type: Boolean, default: false },
   isAdmin: { type: Boolean, default: false },
});
const UserModel = mongoose.model("User",userSchema)
 

module.exports =  UserModel;
