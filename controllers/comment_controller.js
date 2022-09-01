const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create=async function(req,res){
    try{
        //req.body.post from 'form'
         let post= await Post.findById(req.body.post);
        
    if(post){
        let comment= await Comment.create({
                content:req.body.content,
                post:req.body.post,  //req.body.post==post._id
                user:req.user._id
            });
                //adding comment to the post
                post.comments.push(comment);
                post.save();  //whenever update save into database
                res.redirect('/');
    
      }

    } catch(err) {
       console.log(`Error: ${err}`);
       return;
    }
    
}


module.exports.destroy=async function(req,res){
    try{
        let comment=await Comment.findById(req.params['id']);
        if(req.user.id==comment.user){
            let postId=comment.post; //fetching post-id before deleting comment
            comment.remove(); //deleting comment from Comment collection

            //deleting post->commentsArray->commentId
           let post= await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
           return res.redirect('back');
           
        }
        else{
            console.log('Not found!');
            return res.redirect('back');
        }
    } catch(err) {
        console.log(`Error: ${err}`);
        return;
    }
      

}