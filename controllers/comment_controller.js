const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create=function(req,res){
    //req.body.post from 'form'
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,  //req.body.post==post._id
                user:req.user._id
            },function(err,comment){
                if(err){
                    console.log('error in creating comment');
                    return;
                }
                //adding comment to the post
                post.comments.push(comment);
                post.save();  //whenever update save into database
                res.redirect('/');
            })
        }
    })
}
