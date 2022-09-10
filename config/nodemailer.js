//npm install nodemailer
const nodemailer=require('nodemailer');
const path=require('path');
const ejs=require('ejs');

let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user: 'testdevelopment25@gmail.com',
        pass: 'lyctkzmprtezfrcw'
    }
})

//send HTML to the relative file in views ; data is which data(variable) in page to be rendered
let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(path.join(__dirname,'../views/mailers',relativePath),data,function(err,template){
        if(err){
            console.log('error in rendring template file');
            return;
        }
        mailHTML=template;
    })
    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}