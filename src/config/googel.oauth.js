
require("dotenv").config()
const passport=require("passport")
const { v4 :uuidv4 } = require('uuid');
const User=require("../controler/user.controler")
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret:  process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback",
    passReqToCallback   : true
  },
 async function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
// console.log(accessToken,refreshToken,profile)
// console.log("email",profile?.email)

   let user= await User.findOne({email:profile?.email}).lean().exec()

   if(!user){
        user=await User.create({
           email:profile?.email,
           password:uuidv4(),
           role:["costomer"]
        })
   }

console.log(user)

    // });
    return done(null, user);
  }
));


module.exports=passport