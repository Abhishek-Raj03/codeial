const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=function(req,res){
    // console.log(req.body);
    Post.create({
        
        content:req.body.content,  //req.body.content is from 'form' in home.ejs
        user:req.user._id
    },function(err,post){
        if(err){
            console.log('error in post');
            return;
        }
        return res.redirect('back'); 
    })
}

module.exports.destroy=function(req,res){
    console.log(req.user);
    //req.params['id']==req.params.id
     Post.findById(req.params['id'],function(err,post){
        if(err){
            console.log('error in finding post');
            return;
        }
      // .id means converting the object id into string
        if(post.user==req.user.id){
            post.remove();

            Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
     })
}