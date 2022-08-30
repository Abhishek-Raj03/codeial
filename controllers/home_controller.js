const Post=require('../models/post');
const { post } = require('../routes');

module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',450909654)
    // console.log(req.cookies);

//    Post.find({},function(err,posts){
//     return res.render('home',{
//         title:'Home',
//         posts:posts
//     })
//    })
Post.find({}).populate('user').exec(function(err,posts){
    return res.render('home',{
                title:'Home',
                posts:posts
            })
})


}
