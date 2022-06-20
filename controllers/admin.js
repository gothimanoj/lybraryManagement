
const bookModel = require('../models/book.js');
const UserModel = require('../models/user.js');
const IssueModel = require('../models/issue.js');
const ActivityModel = require('../models/activity.js');
// const CommentModel = require('../models/comments.js');

module.exports ={
    AdminCreateBook : async(req,res,next)=>{
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
            const books_count = await BookModel.find().countDocuments();
            const Activity_count = await ActivityModel.find().countDocuments();
            const Activity = await ActivityModel
            .find()
            .sort()
            .skip((PER_PAGE * page)-PER_PAGE)
            .limit(PER_PAGE)

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
}