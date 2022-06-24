
const bookModel = require('../models/book.js');
const UserModel = require('../models/user.js');
const IssueModel = require('../models/issue.js');
const ActivityModel = require('../models/activity.js');
const CommentModel = require('../models/comment.js');

var PER_PAGE = 10;

module.exports ={
    AdminCreateBook : async(req,res)=>{
        try{
            const search_value = req.body.searchUser;
            const books_count = await bookModel.find().countDocuments();
            const Users_count = await UserModel.find().countDocuments();
            
            const activity = await ActivityModel.find({
                $or:[
                    {"user_id.username":search_value},
                    {"Categories":search_value}
                ]
            });
            res.json({success:true,
                Users_count:Users_count,
                books_count:books_count,
                activity:activity,
                current:1,
                pages:0
            });
        }catch(error){
            res.json({success:false, mes:error.mes})
        }
    },
     getAdmin : async(req,res,next)=>{
        try{
            const page = req.query.page || 1;
            const Users_count = await UserModel.find().countDocuments();
            const books_count = await bookModel.find().countDocuments();
            const Activity_count = await ActivityModel.find().countDocuments();
            const Activity = await ActivityModel
            .find()
            .sort()
            .skip((PER_PAGE * page)-PER_PAGE)
            .limit(PER_PAGE)
            console.log(Activity,"hello");

            res.json({success:true,
                Users_count:Users_count,
                books_count:books_count,
                Activity_count:Activity_count,
                Activity:Activity,
                current:page,pages:0})

        }catch(error){
            console.log(error);
            res.json({success:false, mes:error.mes})
        }
     },
     SearchedUser : async (req,res) => {
        try {
            const page = req.params.page || 1;
            const search_value = req.body.searchUser;
    
            const users = await UserModel.find({
                $or: [
                    {"firstName": search_value},
                    {"lastName": search_value},
                    {"username": search_value},
                    {"email": search_value},
                ]
            });
     
            if(users.length <= 0) {
                 res.json({message: "No users found"});
            } else {
                res.json({
                    success:true,
                    users: users,
                    current: page,
                    pages: 0,
                });
            }
        } catch (err) {
            console.log(err);
            res.json({success:false,
                 message:err})
        }
    },
    getUserProfile :async (req, res, next) => {
        try {
            const user_id = req.params.user_id;
    
            const user = await UserModel.findById(user_id);
            const issues = await IssueModel.find({"user_id.id": user_id});
            const comments = await CommentModel.find({"author.id": user_id});
            const activities = await ActivityModel.find({"user_id.id": user_id}).sort('-entryTime');
    
            res.json({
                success:true,
                user: user,
                issues: issues,
                activities: activities,
                comments: comments,
            });
        } catch (err) {
            console.log(err);
            res.json({success:false, message:"can not get userProfile"})
           }
    
    },
}