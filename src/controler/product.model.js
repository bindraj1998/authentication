
const mongoose=require("mongoose")


const productSchema=new mongoose.Schema({
    
    title:{type:String,required:true},
    price:{type:Number,required:true},
     user_id:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}

    
},{versionKey:false,timestamps:true})


const product=mongoose.model("product",productSchema)

module.exports=product