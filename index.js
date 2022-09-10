//for uploading files multer is used
//for flash messages flash is used
//npm install connect-mongo
//npm install cookie-parser
//npm install passport
//npm install passport-local
//npm install express-session
//npm install passport-jwt
//npm install json web token
//npm install passport-google-oauth
//npm install crypto (crypto is used to generate random password)
//npm install nodemailer (to send mail to users regarding posts,comments,likes etc)
//npm install kue (for delayed jobs)

const express=require('express');
const cookieParser=require('cookie-parser');

const { urlencoded } = require('express');



const app=express();
const port=8000;
//npm install express-ejs-layouts
const expressLayouts=require('express-ejs-layouts'); 

//npm install mongoose
const db=require('./config/mongoose');
const User=require('./models/user');

//used for session cookie
//npm install express-session
const session=require('express-session'); //used for storing session cookie
//npm install passport

//require environment variable
require('dotenv').config();

const passport=require('passport');
//npm install passport-local
const passportLocal=require('./config/passport-local-strategy');
//npm install passport-jwt
const passportJWT=require('./config/passport-jwt-strategy');
//npm install passport-google-oauth
const passportGoogle=require('./config/passport-google-oauth2-strategy');

//npm install connect-mongo
const MongoStore=require('connect-mongo'); //used to store session-cookie in db

// const connect=require('connect');

//npm install node-sass-middleware
const sassMiddleware=require('node-sass-middleware');

//npm install connect-flash
const flash=require('connect-flash');
const customMware=require('./config/middleware');



app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css' 
}));
//use static files
app.use(express.static('./assets'));

//make tthe uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'))

app.use(expressLayouts);

//extract styles and scripts from individual pages to layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(express.urlencoded());
app.use(cookieParser());



//set up view engine
app.set('view engine','ejs');
app.set('views','./views'); 

//mongo store is used to store session cookie in db 
app.use(session({
    name:'codiel',
    //TODO change the secret to encrepted before deployment
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100*24)
    },
    store:MongoStore.create( 
        {
            mongoUrl:'mongodb://localhost/codial_db',
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect-mongo db setup ok');
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser); 

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
})
