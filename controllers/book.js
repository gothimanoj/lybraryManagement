const bookModel = require('../models/book.js');
const PER_PAGE = 10;

module.exports = {

    createBook : async(req,res)=>{
        try{
            const {title, ISBN, stock, author, discription, category,comments} = req.body;
            console.log(req.body);
            if(req.decode.isAdmin===true){
                const bookData = new bookModel({title, ISBN, stock, author, discription, category, comments})
                // console.log(bookData);
                if(bookData){
                    await bookData.save()
                    res.json({success: true, message:"Book created", data:bookData})
                }
                else{
                    res.json({success: false, message:"All field are require"})
                }
            }
            else{
                res.json({
                    success: false, message:"user not authorized"
                })
            }
        }catch(err){
            console.log(err);
            res.json({success: false, message:"error saving book"})

        }
    },

    getAllBooks : async(req,res)=>{
        
        const page = req.params.page || 1;
        const value = req.params.value;
    let searchObj = {};


        try{
            const bool = await Book
            .find(searchObj)
            .skip((PER_PAGE * page)-PER_PAGE)
            .limit(PER_PAGE);

            const result = await Book.find(searchObj).countDocuments()

            res.json({success:true, mes:"book Found", result:result});

        }catch(err){
            console.log(err);
            res.json({success:false, mes:"book Not Found"})
        }
    },
    getBookDetails : async(req, res, next) => {
        try {
           const book_id = req.params.book_id;
           const book = await Book.findById(book_id).populate("Comments");
           res.json({success: true, message:"book get details", data:book})
        } catch (err) {
           console.log(err);
            res.json({success: false, message:"book not found"})
     }

    },
}
 