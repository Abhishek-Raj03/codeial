const Post=require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/like');

module.exports.toggleLike=async function(req,res){
    try{
       //  likes/toggle/?id=abc123&type=Post
       let likeable;
       let deleted=false;

       if(req.query.type=='Post'){
        likeable=await Post.findById(req.query.id).populate('likes');
       }
       else{
        likeable=await Comment.findById(req.query.id).populate('likes');
       }

       // check if like already exists
       let existingLike=await Like.findOne({
          user:req.user._id,
          likeable:req.query.id,
          onModel:req.query.type
       })

       if(existingLike){
         // if a like already exists then delete it
         likeable.likes.pull(existingLike._id);
         likeable.save();
         existingLike.remove();
         deleted=true;
       }
       else{
        // else make a new like
        let newLike=await Like.create({
            user:req.user._id,
            likeable:req.query.id,
            onModel:req.query.type
        })
         likeable.likes.push(newLike._id);
         likeable.save();
       }
      console.log(deleted);
       return res.json(200,{
         message:'Request Successfull',
         data:{
            deleted:deleted
         }
       })
       
    } catch(err) {
        console.log(`Error: ${err}`);
        return res.json(500,{
            message:'Internal Server Error'
        })
    }
}