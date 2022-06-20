const UserModel = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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
}
