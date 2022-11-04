const Chat=require('../models/chat');

module.exports.create=async function(req,res){
    console.log(req.body);
    try{
        let chat=await Chat.create({
            content:req.body.content,
            user:req.user._id
        })
        if(req.xhr){
            return res.status(200).json({});
        }
        return res.redirect('back');
    } catch(err) {
        req.flash('error',err);
        return res.redirect('back');
    }
}