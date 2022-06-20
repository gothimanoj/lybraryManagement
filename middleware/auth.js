const jwt = require('jsonwebtoken');
 

const auth = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1] //req.header("authorizonation")
        //   console.log(token)
        if(!token){
            return res.status(400).json({msg: "must be token"})
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err){
                return res.status(400).json({msg: "Invalid Authentication"})
            }
            req.decode = user;
            next()
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({msg: error.message})

    }
}
module.exports = auth;