const passport = require('passport');
const User=require('../models/user');
const Post=require('../models/post');
const { findById } = require('../models/user');
const fs=require('fs'); //file system
const path=require('path');

//render profile
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:'Users',
            profile_user:user,
            // user:user
        })
    })
}
module.exports.update=async function(req,res){
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         req.flash('success','updated!')
    //         return res.redirect('back');
    //     })
    // }
    // else{
    //     req.flash('error',err)
    //     return res.status(401).send('unauthorized');
    // }
    if(req.user.id==req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('Error in uploading avatar: ',err);
                }
                user.name=req.body.name;
                user.email=req.body.email;
                console.log(req.file);
                if(req.file){
                    if(user.avatar && fs.existsSync(path.join(__dirname,'..',user.avatar))){ 
                        //this needs fs and path
                       fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                     // this is saving the path of uploaded file into the avatar field in the user
                    user.avatar=User.avatarPath +'/'+ req.file.filename; //here 'avatar' is from db
                }
                user.save();
                return res.redirect('back');
            })
        }catch(err){
        req.flash('error',err);
        return res.redirect('back');
        }
    }
    else{
        req.flash('error',err)
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
       return res.redirect('/profile');
    }
    return res.render('user_sign_up',{
        title:'Codeial | signup'
    })
}
//render the signin page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/profile');
    }
    return res.render('user_sign_in',{
        title:'Codeial | signin'
    })
}
//get the signup data
module.exports.create=function(req,res){
    console.log(req.body);
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
              req.flash('success','user created successfully!');
              return res.redirect('/profile');
        })
      }
      else{
        req.flash('error','error in creating user!');
          return res.redirect('back');

      }
   })
     
}
//signin and create a session for user data
module.exports.createSession=function(req,res){
   req.flash('success','logged in successfully!'); //fetching flash from request
   return res.redirect('/profile');
}

//signout
module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        req.flash('success','logged out successfully!'); 
        return res.redirect('/');
    });
  
}
