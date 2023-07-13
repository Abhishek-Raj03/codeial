const Post = require('../models/post');
// const { post } = require('../routes');
const User=require('../models/user');
const Comment=require('../models/comment');
const Chat=require('../models/chat');

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
                path:'user likes',
            }
            // populate:{
            //     path:'likes'
            // }
        }).populate('likes');
        let chats=await Chat.find({}).populate('user')
        let users=await User.find({}).populate('chats')
        // console.log("cookie is: ",locals.user.id)
        return res.render('home', {
            title: 'Home',
            chats:chats,
            posts: posts,
            all_users:users
        });
    } catch(err) {
        // console.log(`Error: ${err}`);
        req.flash('error',err);
        return;
    }
}

module.exports.contact=function(req,res){
    return res.render('_contact',{
        title:'contact us'
    });
}