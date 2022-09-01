const passport = require('passport');
const User=require('../models/user');
const Post=require('../models/post');

//render profile
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:'Users',
            profile_user:user
        })
    })
}
module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        })
    }
    else{
        return res.status(401).send('unauthorized');
    }
}
//render post
// module.exports.posts=function(req,res){
//    if(req.isAuthenticated()){
//       Post.create(req.body,function(err,post){
//         if(err){
//             console.log('error in posting');
//             return;
//         }
//         return res.redirect('/users/profile');
//       })
//    }
//    else{
//     console.log('not authenticated');
//     // alert('please login');
//     return res.redirect('back');
//    }
// }
//render the signup page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:'Codeial | signup'
    })
}
//render the signin page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
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

   return res.redirect('/users/profile');
}

//signout
module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){
            return next(err);
        }
    });
    return res.redirect('/');
}
