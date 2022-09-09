const passport = require('passport');
//npm install passport-google-oauth
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
//npm install crypto
const crypto = require('crypto');  // generate random password
const User = require('../models/user');

//tell passport to use new strategy for google login
passport.use(new googleStrategy({
        clientID: "791976790785-qmjnssqs8bmv59u5uu87oien89ghpnf2.apps.googleusercontent.com",
        clientSecret: "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",
        // google gives back information of user into this callback url
        callbackURL: "http://localhost:8000/users/auth/google/callback" 
  },
    
     function (accessToken, refreshToken, profile, done) { //oauth also uses accesToken as JWT,refreshToken:when accessToken expires
        // find a user   
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('Error in google-strategy-passport: ',err);
                return;
            }
            console.log(profile);
    
            if(user){
                // if found,set this user as req.user (sign-in)
                return done(null,user);
            }
            else{
                // if not found, create this user and set this user as req.user(create then sign-in)
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                }, function(err,user){
                    if(err){
                        console.log('Error in creating google-strategy-passport: ',err);
                        return;
                    }
                    return done(null,user);
                })
            }
           })
     }

))
module.exports=passport;
