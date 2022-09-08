const User=require('../../../models/user');
//npm install jsonwebtoken
const jwt=require('jsonwebtoken');


//signin and create a session for user data
module.exports.createSession=async function(req,res){
    try{
      let user=await User.findOne({email:req.body.email});
      if(!user || user.password!=req.body.password){
        return res.json(422,{
            message:"Invalid username/password"
        })
      }
      return res.json(200,{
        message:"sign-in successfull",
        data:{
            token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'1000000'})
        }
      })
    } catch(err) {
        return res.json(500,{
            message:"sign-in error"
        })
    }
 }