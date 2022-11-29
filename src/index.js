const express=require("express")

const app =express()
const mongoose=require("mongoose")

const passport=require("./config/googel.oauth")
const session = require('express-session')

app.use(express.json())
const productcontroler=require("./proctcontroler/product.controler")
const {resister,login,userToken}=require("./controler/auth.controler")
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
passport.serializeUser(function(user, done) {
    console.log("hello",user)
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    
      done(null, user);
   
  })

const connect=()=>{
    return mongoose.connect("mongodb://localhost:27017/web14-authentication")
}



app.post("/resister",resister)
app.post("/login",login)
app.use("/products",productcontroler)

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        // successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}),
   (req,res)=>{
    let token=userToken(req.user)
                return res.send({user:req.user,token})   

    return res.send(req.user)
   }
);

app.listen(8080,async function(){
try{
        await connect()
        console.log("lisnning port 8080")
}catch(err){
    console.log(err.message)
}

})