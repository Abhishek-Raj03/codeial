const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create=function(req,res){
    //req.body.post from 'form'
    Post.findById(req.body.post,function(err,post){
        if(err){
            console.log('error in creating comments');
            return;
        }
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


module.exports.destroy=function(req,res){
    Comment.findById(req.params['id'],function(err,comment){
        if(err){
            console.log('error in finding comments');
            return;
        }
        if(req.user.id==comment.user){
            let postId=comment.post; //fetching post-id before deleting comment
            comment.remove(); //deleting comment from Comment collection

            //deleting post->commentsArray->commentId
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
                
            })

        }
        else{
            console.log('Not found!');
            return res.redirect('back');
        }
    })
}