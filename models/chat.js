const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId, //keeps the ids
        ref:'User',  //same name as of collection name for reference
        
    },
},{
    timestamps:true
})

const Chat=mongoose.model('Chat',chatSchema);
module.exports=Chat;