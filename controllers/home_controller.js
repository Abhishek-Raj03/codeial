const Post = require('../models/post');
// const { post } = require('../routes');
const User=require('../models/user');
const Comment=require('../models/comment');

// module.exports.home = function (req, res) {
//     //populate is used to join to other db
//     //here 'user' named field in post db needs to be populated or join to other db whose reference is given in schema
//     Post.find({}).populate('user')
//     .populate({
//         path:'comments',
//         populate:{
//             path:'user',
//             // path:'post'
//         }
//     })
//     .exec(function (err, posts) {
//         User.find({},function(err,users){
//             return res.render('home', {
//                 title: 'Home',
//                 posts: posts,
//                 all_users:users
//             })
//         })
       
//     })
// }
module.exports.welcome=function(req,res){
    return res.render('welcome',{
        title:'welcome'
    });
}

module.exports.home=async function(req,res){
    try{
          let posts=await Post.find({}).populate('user')
          .sort('-createdAt')
          .populate({
            path:'comments',
            populate:{
                path:'user',
            }
        });
        let users=await User.find({});
        return res.render('home', {
            title: 'Home',
            posts: posts,
            all_users:users
        });
    } catch(err) {
        // console.log(`Error: ${err}`);
        req.flash('error',err);
        return;
    }
}
