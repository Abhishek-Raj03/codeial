const nodeMailer=require('../config/nodemailer');

exports.newComment=(comment)=>{
    
    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    // let htmlString='<h1>hii</h1>'
    nodeMailer.transporter.sendMail({
        
        from:'testdeveloper25@gmail.com',
        to:comment.user.email,
        
        subject:'new comment published',
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('error in sending mail: ',err);
            return;
        }
        console.log('Mail sent: ',info);
        return;
    })
}