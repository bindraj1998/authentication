require("dotenv").config()
const User=require("./user.controler")
var jwt = require('jsonwebtoken')
const userToken=(user)=>{
    // console.log(process.env)
    return jwt.sign({ user}, process.env.JW_SECRET_KEY);
}

const resister= async(req,res)=>{
    try{
           
           let user=await User.findOne({email:req.body.email}).lean().exec()

       if(user){
        return res.status(400).send({message:"user alredy exist try another email"})
       }
        

         user=await User.create(req.body)

              
      let token=userToken(user)
      

          return res.send({user,token})
    }catch(err){
        return res.status(500).send(err.message)
    }
}

const login= async(req,res)=>{
    try{


         
        let user=await User.findOne({email:req.body.email})

        if(!user){
         return res.status(400).send({message:"user not exist try another email"})
        }
         
     let match=user.checkpassword(req.body.password)

         if(!match)return res.status(400).send({message:"password or email not matched try another email"})

         let token=userToken(user)
                return res.send({user,token})   

    }catch(err){
        return res.status(500).send(err.message)
    }
}




module.exports={login,resister,userToken}