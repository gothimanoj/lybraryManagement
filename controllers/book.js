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
            const book = await bookModel
            .find(searchObj)
            .skip((PER_PAGE * page)-PER_PAGE)
            .limit(PER_PAGE);

            const result = await bookModel.find(searchObj).countDocuments()

            res.json({success:true, mes:"book Found", result:result});

        }catch(err){
            console.log(err);
            res.json({success:false, mes:"Book Not found"})
        }
    },
    getBookDetails : async(req,res) => {
        console.log("get book")
        try {
           const book_id = req.params.book_id;
           console.log(book_id,"book")
           const book = await bookModel.findById(book_id).populate("Comments");
           console.log(book,"book2");
           res.json({success: true,
              message:"book get details",
              data:book})
        } catch (err) {
        //    console.log(err);
            res.json({ success:false,
                mes:"can't get details",
                title:"who is a better management",
                ISBN:"12-457-4875",
                stock:36,
                author:"Smrati Devi",
                category:"History",
                
                
            })
     }  

    },
    
    
}
 