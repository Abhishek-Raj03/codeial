const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        // type:ObjectId,
        ref:'User',
        // required:true
    }
    // abc:{
    //     type:String,
    //     required:true
    // }
},{
    timestamps:true
})

const Post=mongoose.model('Post',postSchema);
module.exports=Post;