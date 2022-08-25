const express=require('express');
const cookieParser=require('cookie-parser');
const { urlencoded } = require('express');

const db=require('./config/mongoose');
const User=require('./models/user');

const app=express();
const port=8000;

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
