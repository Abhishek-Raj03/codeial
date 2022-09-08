const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.index=async function(req,res){
    let post=await Post.find({}).populate('user')
          .sort('-createdAt')
          .populate({
            path:'comments',
            populate:{
                path:'user',
            }
        });
    return res.json(200,{
        message:'List of posts',
        posts:post
    })
}

module.exports.destroy=async function(req,res){
    try{
        //req.params['id']==req.params.id
    let post=await Post.findById(req.params['id']);
    
    // .id means converting the object id into string
      if(post.user==req.user.id){
          post.remove();
         await Comment.deleteMany({post:req.params.id});
        //  if(req.xhr){
        //     return res.status(200).json({
        //         data:{
        //             post_id:req.params.id
        //         },
        //         message:"post removed!"
        //     })
        //  }
        
         return res.json(200,{
            message:'post deleted successfully'
         })
        }else{
            return res.json(401,{
                message:"you cant delete this post"
            })
        }
     
    }
    catch(err){
        // console.log(`Error: ${err}`);
        
        return res.json(500,{
            message:"Internal server error"
        })
    }
}
