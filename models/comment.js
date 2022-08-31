const mongoose=require('mongoose');
const { TRUE } = require('node-sass');

const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //comment belongs to a user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //comment on a post
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps:true
})

const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;