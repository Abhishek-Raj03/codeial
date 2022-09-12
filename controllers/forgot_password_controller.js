// const Post=require('../models/post');
// const Comment=require('../models/comment');
// const path=require('path');
const User=require('../models/user');
const passwordMailer=require('../mailers/forgot_password_mailer');

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

// module.exports.otp=function(req,res){
//     if(req.body.otp==)
// }