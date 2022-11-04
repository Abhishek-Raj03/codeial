const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //keeping the user id who has commented
    user:{
        type:mongoose.Schema.Types.ObjectId, //keeps the ids
        ref:'User',  //same name as of collection name for reference
        
    },
    //include the array of ids of all comments in this post scema itself
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment',
        }
    ],
    // stores array of likes id in a post
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
   
},{
    timestamps:true
})

const Post=mongoose.model('Post',postSchema);
module.exports=Post;