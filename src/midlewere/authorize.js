module.exports=function(data){


    return function(req,res,next){
   let user=req.user

      let athorise=false

    data.map(el=>{
        
       if(user.role.includes(el)) athorise=true
      
    })

    if(!athorise){
        return res.status(403).send({message:"permission denied"})
    }

    return next()
    }

}