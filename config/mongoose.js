//require mongoose library
const mongoose=require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/codial_db');

//acquire connection 
const db=mongoose.connection;

//if error
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running then print message
db.once('open',function(){
    console.log('sucessfully connected to database');
})

module.exports=db;