const express=require("express")

const Product=require("../controler/product.model")
const router=express.Router()

const authenticate=require("../midlewere/authenticate")

const athorise=require("../midlewere/authorize")

router.post("",authenticate,async(req,res)=>{
     console.log("p",req.user)
    const user=req.user._id
    console.log(user)
    try{

        const product =await Product.create({
            title:req.body.title,
            price:req.body.price,
            user_id:user,
        })
        return res.send(product)

    }catch(err){
        return res.status(500).send({message:err.message})
    }
})


router.patch("/:id",authenticate,athorise(["seller","admin"]),async(req,res)=>{
    console.log("p",req.user)
   const user=req.user._id
   console.log(user)
   try{

       const product =await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
       return res.send(product)

   }catch(err){
       return res.status(500).send({message:err.message})
   }
})




module.exports=router