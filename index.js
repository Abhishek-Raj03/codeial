const express=require('express');
const cookieParser=require('cookie-parser');
const { urlencoded } = require('express');

//npm install mongoose
const db=require('./config/mongoose');
const User=require('./models/user');

const app=express();
const port=8000;
//npm install express-ejs-layouts
const expressLayouts=require('express-ejs-layouts'); 
//use static files
app.use(express.static('./assets')) 

app.use(expressLayouts);

//extract styles and scripts from individual pages to layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(express.urlencoded());
app.use(cookieParser());
// use express router
app.use('/',require('./routes/index'));

app.set('view engine','ejs');
app.set('views','./views'); 

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
})
