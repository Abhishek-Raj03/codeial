const Post=require('../models/post');

module.exports.create=function(req,res){
    console.log(req.body);
    Post.create({
        
        content:req.body.content,  //req.body.content is from 'form' in home.ejs
        user:req.user._id
    },function(err,post){
        if(err){
            console.log('error in post');
            return;
        }
        return res.redirect('back'); 
    })
}