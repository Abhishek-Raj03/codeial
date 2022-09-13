const nodeMailer=require('../config/nodemailer');
const path=require('path');
const ejs=require('ejs');
const Otp=require('../models/otp');
// let random=0;

//send HTML to the relative file in views ; data is which data(variable) in page to be rendered
let renderTemplate1=(random)=>{
    let mailHTML;
    // console.log(random);

    ejs.renderFile(path.join(__dirname,'../views/mailers/forgot_password/new_otp.ejs'),{random:random},function(err,template){
        if(err){
            console.log('error in rendring template file',err);
            return;
        }
        mailHTML=template;
    })
    return mailHTML;
}
exports.reset=(email)=>{
   let random=Math.floor((Math.random()*10000)+1);

    let htmlString=renderTemplate1(random);
    // let htmlString='hii'
  

    nodeMailer.transporter.sendMail({
        
        from:'testdeveloper25@gmail.com',
        to:email,
        
        subject:'OTP for Forgot password setup',
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('error in sending mail: ',err);
            return;
        }
        Otp.create({content:random,email:email},function(err,number){
            if(err){
                console.log('Error in OTP database');
                return;
            }
    
        })
        console.log('Mail sent: ',info);
        return;
    })
}
// module.exports={ random:random}
// exports.random=random;
