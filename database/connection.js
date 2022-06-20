const mongoose = require('mongoose');

const connectDB = async(req,res)=>{
    try {
        await mongoose.connect(process.env.URL)
        console.log("Mongodb connection successfully");
    } catch (error) {

        console.log(error)
        
    }
}
module.exports = connectDB 