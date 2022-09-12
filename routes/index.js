const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
const passport=require('../config/passport-local-strategy');



console.log('router loaded');

router.get('/',homeController.home);

router.use('/forgot-password',require('./password'));


router.use('/users',require('./users'));

router.use('/posts',require('./posts'));

router.use('/comments',require('./comments'));

router.use('/api',require('./api/index'));




module.exports=router; 