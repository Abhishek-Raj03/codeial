const Post=require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/like');
const User=require('../models/user');

module.exports.create= async function(req,res){
    try{
         let post=await Post.create({
            content:req.body.content,  //req.body.content is from 'form' in home.ejs
            user:req.user._id
        });

        let name=req.user.name;
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post,
                    name:name
                },
                message:'post created!'
            })
        }
        req.flash('success','post published!');
        return res.redirect('back');
    } catch(err) {
        // console.log(`Error: ${err}`);
        req.flash('error',err);
        return res.redirect('back');

    }
        
}

module.exports.destroy=async function(req,res){
    try{
        //req.params['id']==req.params.id
    let post=await Post.findById(req.params.id);
    
    // .id means converting the object id into string
      if(post.user==req.user.id){
       // deleting the likes associated with that post
          post.remove();
         await Comment.deleteMany({post:req.params.id});
        await Like.deleteMany({likeable: req.params.id});


         if(req.xhr){
            return res.status(200).json({ // or return res.json(200,{...})
                data:{
                    post_id:req.params.id
                },
                message:"post removed!"
            })
         }
         req.flash('success','post deleted');
         return res.redirect('back');
      }
      else{
        req.flash('success','you cant delete this post');
          return res.redirect('back');
      }
    }
    catch(err){
        // console.log(`Error: ${err}`);
        req.flash('error',err);
        return res.redirect('back');
    }
}