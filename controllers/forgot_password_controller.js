// const Post=require('../models/post');
// const Comment=require('../models/comment');
// const path=require('path');
const User=require('../models/user');
const passwordMailer=require('../mailers/forgot_password_mailer');
const Otp=require('../models/otp');


module.exports.emailForm=function(req,res){
    return res.render('forgot_password/emailForm',{
        title:'forget!'
    });
}

module.exports.verify=function(req,res){
    console.log(req.body.email);
    console.log(req.body);

    User.findOne({email:req.body.email},function(err,user){
        // console.log(user);
        if(err){
            console.log('Error in finding user',err);
            return;
        }
        if(user){
            console.log(req.body.email);
            // console.log(random);
            passwordMailer.reset(req.body.email);
            return res.render('forgot_password/otp',{
                title:'OTP'
            })
        }
        else{
            console.log('user not found');
            return res.json(401,{
                message:'User Not Found'
            })

        }
    })
}

module.exports.otp=function(req,res){
    console.log('Inside OTP');
    // if(req.body.otp==passwordMailer.random){
    //     console.log(passwordMailer.random);
    //     console.log('found');

    // }
    // else{
    //     console.log(passwordMailer.random);
    //     console.log(req.body.otp);
    //     console.log('Not found');

    // }
    Otp.findOne({},function(err,otp){
        if(err){
            console.log('error in finding OTP in db',err);
            return;
        }
        if(otp){
           if(otp.content==req.body.otp){
            // Otp.deleteOne({},function(err){
            //     console.log('Error in deleting');
            //     return;
            // })
            return res.render('forgot_password/create.ejs',{
                title:'Credentials'
            })
           } 
           else{
            Otp.deleteOne({},function(err){
                return res.render('forgot_password/emailForm',{
                    title:'forget!'
                });
            })
           }
        }
        else{
            return res.json('401',{
                message:'OTP NOT FOUND'
            })
        }
    })
}
module.exports.createPassword=function(req,res){
    Otp.findOne({},function(err,otp){
        if(err){
            console.log('error in finding OTP in db',err);
            return;
        }
        let email=otp.email;
        Otp.deleteOne({},function(err){
                return;
            })
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding user in forgot password controller',err);
                return;
            }
            if(req.body.password!=req.body.confirm_password){
                req.flash('error','Not Matched');
                return res.redirect('/');
            }
            user.password=req.body.password;
            user.save();
            req.flash('success','Password changed successfully');
            return res.redirect('/');
        })
    })
}