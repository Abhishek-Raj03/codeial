const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({
    // the person(user) who is liking the post or comment
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    // this defines the objectid of liked object on which like is placed
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    // this field is used for defining the type of liked object since this is dynamic reference
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
})

const Like=mongoose.model('Like',likeSchema);
module.exports=Like;