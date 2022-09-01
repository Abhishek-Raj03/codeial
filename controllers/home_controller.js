const Post = require('../models/post');
const { post } = require('../routes');
const User=require('../models/user');

module.exports.home = function (req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id',450909654)
    // console.log(req.cookies);

    //    Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:'Home',
    //         posts:posts
    //     })
    //    })
    //populate is used to join to other db
    //here 'user' named field in post db needs to be populated or join to other db whose reference is given in schema
    Post.find({}).populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user',
            // path:'post'
        }
    })
    .exec(function (err, posts) {
        User.find({},function(err,users){
            return res.render('home', {
                title: 'Home',
                posts: posts,
                all_users:users
            })
        })
       
    })


}
