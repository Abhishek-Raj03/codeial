const User=require('../models/user');

//render profile
module.exports.profile=function(req,res){
    return res.render('user',{
        title:'Users'
    })
}
//render post
module.exports.post=function(req,res){
    return res.render('user',{
        title:'Users'
    })
}
//render the signup page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:'Codeial | signup'
    })
}
//render the signin page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:'Codeial | signin'
    })
}
//get the signup data
module.exports.create=function(req,res){
   if(req.body.password!=req.body.confirm_password){
    return res.redirect('back');
   }
   User.findOne({email:req.body.email},function(err,user){
      if(err){
        console.log('error in finding user in signup');
        return;
      }
      if(!user){
        User.create(req.body,function(err,user){
            if(err){
                console.log('error in creating user in signup');
                return;
              }
              return res.redirect('/users/sign-in');
        })
      }
      else{
          return res.redirect('back');

      }
   })
     
}
//signin and create a session for user data
module.exports.createSession=function(req,res){
   //TODO Later
}




