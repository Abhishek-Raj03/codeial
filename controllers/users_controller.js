const User=require('../models/user');
//render profile
module.exports.profile=function(req,res){
    if(req.cookies.user_id){
    const id=req.cookies.user_id;
    User.findById(id,function(err,user){
        if(user){
            return res.render('user',{
                title:'user Profile',
                user:user
            })
        }
       else return res.redirect('/users/sign-in');
    })
}
else{
    return res.redirect('/users/sign-in');
}
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
           console.log('user already exist');
          return res.redirect('back');

      }
   })
     
}

//signin and create a session for user data
module.exports.createSession=function(req,res){
    //steps in manual authentication
   //find the user
   User.findOne({email:req.body.email},function(err,user){
    if(err){
        console.log('error in finding user in sign-in');
        return;
      }

   //handle user found
      if(user){
        //handle password which doesnot matches
        if(user.password!=req.body.password){
            return res.redirect('back');
        }
        //handle session created
        res.cookie('user_id',user.id);
        return res.redirect('/users/profile');
      }
      else{
           //handle user not found
           return res.redirect('back');
      }
   })
}
//handling sign-out
module.exports.delete=function(req,res){
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
}
