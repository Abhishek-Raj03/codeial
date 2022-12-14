const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
const passport=require('../config/passport-local-strategy');
const likesController=require('../controllers/likes_controller');


console.log('router loaded');

router.get('/profile',homeController.home);
router.get('/',homeController.welcome);
router.get('/contact',homeController.contact);
router.use('/forgot-password',require('./password'));


router.use('/users',require('./users'));

router.use('/posts',require('./posts'));

router.use('/comments',require('./comments'));

router.use('/api',require('./api/index'));

router.post('/likes/toggle/',likesController.toggleLike);

// router.use('/chats',require('./chats'));





module.exports=router; 