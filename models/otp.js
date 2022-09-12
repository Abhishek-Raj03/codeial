const mongoose=require('mongoose');

const otpSchema=new mongoose.Schema({
    content:{
        type:Number,
        required:true,
    },
},{
    timestamps:true,
})

const Otp=mongoose.model('Otp',otpSchema);
module.exports=Otp;