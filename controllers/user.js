const UserModel = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const bookModel = require('../models/book.js');
const IssueModel = require('../models/issue.js');
const ActivityModel = require('../models/activity.js'); 
const CommentModel = require('../models/comment.js');
module.exports ={
    register: async(req,res,next)=>{
        try{
            const {firstName,lastName,username,email,address,password}=req.body;
            // console.log(req.body);
            if(firstName && lastName && username && email && address && password){
                //password hashing
                const passwordHash = await bcrypt.hash(password,10);
                // console.log(passwordHash,"password")
                
                const user = await UserModel.findOne({email});
                if(user===null){
                    const newUser = await new UserModel({firstName,lastName,username,email,address,password:passwordHash})
                    console.log(newUser)
                    await newUser.save();
                res.json({success:true,message:"user registered successfully",data:newUser})

                    
                }else{
                res.json({success:false,message:"user already exited"});

                }

            }
           else{
            res.json({success:false,message:"please all fields are required"});
               
           }
             
        }
        catch(error){
            console.log(error);
            res.json({success:false,message:error.message});

        }
    },

    login : async(req,res,next)=>{
        try{
            const {email,password} = req.body;
            if(email && password){
                const user = await UserModel.findOne({email:email})
                if(user!=null){
                    const isMatch = await bcrypt.compare(password,user.password)
                    if((user.email === email) && isMatch){
                        const token = await jwt.sign({userId:user._id},process.env.Access_Token_Secret,{expiresIn:'1h'})
                        res.json({success:true,message:"user looged in successfully",token:token})
                    }
                    else{
                        res.json({success:false,mes:"invalid password"})
                    }
                    
                }
                else{
                    res.json({success:false,mes:"user not found"})
                }
            }else{
                res.json({success:false,mes:"all fields are required"})
            }
        }catch(error){
            console.log(error)
            res.json({success:false,mes:error.mes})
        }
         
    
    },
    IssueBook : async(req,res)=>{
         
    
        try {
            const book = await bookModel.findById(req.params.book_id);
            const user = await UserModel.findById(req.params.user_id);
    
            // registering issue
            book.stock -= 1;
            const issue =  new IssueModel({
                book_info: {
                    id: book._id,
                    title: book.title,
                    author: book.author,
                    ISBN: book.ISBN,
                    category: book.category,
                    stock: book.stock,
                },
                user_id: {
                    id: user._id,
                    username: user.username,
                }
            });
    
             
            user.bookIssueInfo.push(book._id);
    
 
            const activity = new ActivityModel({
                info: {
                    id: book._id,
                    title: book.title,
                },
                category: "Issue",
                time: {
                    id: issue._id,
                    issueDate: issue.book_info.issueDate,
                    returnDate: issue.book_info.returnDate,
                },
                user_id: {
                    id: user._id,
                    username: user.username,
                }
            });
    
 
            await issue.save();
            await user.save();
            await book.save();
            await activity.save();
    
            res.json({success: true, message: 'Successfully updated'});
        } catch(err) {
            console.log(err);
                 res.json({success: false, message: err.message})
        }
    },
    ReturnBook :async(req,res)=> {
        console.log("ReturnBook")
        try {       
            const book_id = req.params.book_id;
            console.log(book_id,"Return")
            const pos = req.user.bookIssueInfo.indexOf(req.params.book_id);
            
             
            const book = await bookModel.findById(book_id);
            console.log(book)
            book.stock += 1; 
            await book.save();
    
 
            const issue =  await IssueModel.findOne({"user_id.id": req.user._id});
            await issue.remove();
    
 
            req.user.bookIssueInfo.splice(pos, 1);
            await req.user.save();
    
 
            const activity = new ActivityModel({
                info: {
                    id: issue.book_info.id,
                    title: issue.book_info.title,
                },
                category: "Return", 
                time: {
                    id: issue._id,
                    issueDate: issue.book_info.issueDate,
                    returnDate: issue.book_info.returnDate,
                },
                user_id: {
                    id: req.user._id,
                    username: req.user.username,
                }
            });
            await activity.save();
    
 
            res.json({success: true, message: 'Successfully updated' })
        } catch(err) {
            console.log(err);
            res.json({success: false, message: err.message});
        }
    },
    RenewBook : async(req,res)=> {
        try {
            const searchObj = {
                "user_id.id": req.user._id,
                "book_info.id": req.params.book_id,
            }
            const issue = await IssueModel.findOne(searchObj);
 
            let time = issue.book_info.returnDate.getTime();
            issue.book_info.returnDate = time + 7*24*60*60*1000;
            issue.book_info.isRenewed = true;
    
 
            const activity = new ActivityModel({
                info: {
                    id: issue._id,
                    title: issue.book_info.title,
                },
                category: "Renew",
                time: {
                    id: issue._id,
                    issueDate: issue.book_info.issueDate,
                    returnDate: issue.book_info.returnDate,
                },
                user_id: {
                    id: req.user._id,
                    username: req.user.username,
                }
            });
    
            await activity.save();
            await issue.save();
    
            res.json({success: true, message: 'Successfully updated'})
        } catch (err) {
            console.log(err);
            res.json({success: false, message: err.message});
            
        }
    },
    
    NewComment : async(req, res) => {
            console.log("hello")
        try {
            const comment_text = req.body.comment;
            console.log(comment_text);
            const user_id = req.user._id;
            const username = req.body.username;
    
            
            const book_id = req.params.book_id;
            const book = await bookModel.findById(book_id);
    
             
            const comment = new CommentModel({
                text: comment_text,
                author: {
                    id: user_id,
                    username: username,
                },
                book: {
                    id: book._id,
                    title: book.title,
                }
            });
            await comment.save();
            
             
            book.comments.push(comment._id);
            await book.save();
    
            
            const activity = new ActivityModel({
                info: {
                    id: book._id,
                    title: book.title,
                },
                category: "Comment",
                user_id: {
                    id: user_id,
                    username: username,
                }
            });
            await activity.save();
    
            req.json({success: true, message: 'Comment created successfully'})
        } catch (err) {
            console.log(err);
             res.json({success: false, message: err.message})    
            
        } 
    },

    getAllBooks : async(req,res)=>{

        try{
            const id = req.params.id;
            if(id){
                
            const book = await bookModel.find(id).populate({path:"Book",select:{_id:0,title:1}})
                res.json({success: true, message:"all books found",Allbooks: book})
            
        }else{
            res.json({success: false, message:"user id not found"})
        }
        }catch(error){
            console.log(error);
            res.json({success:false, message:error.message})
        }
    },
    
    
}
