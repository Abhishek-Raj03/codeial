//npm install connect-mongo
//npm install passport
//npm install passport-local
//npm install express-session

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
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

//npm install connect-mongo
const MongoStore=require('connect-mongo');

//use static files
app.use(express.static('./assets')) 

app.use(expressLayouts);

//extract styles and scripts from individual pages to layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(express.urlencoded());
app.use(cookieParser());



//set up view engine
app.set('view engine','ejs');
app.set('views','./views'); 

app.use(session({
    name:'codiel',
    //TODO change the secret to encrepted before deployment
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
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


// use express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
})
