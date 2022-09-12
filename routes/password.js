const express=require('express');
const router=express.Router();
const passwordController=require('../controllers/forgot_password_controller');

router.get('/',passwordController.emailForm)

router.post('/verify',passwordController.verify);
router.post('/otp',passwordController.otp);
router.post('/create',passwordController.createPassword)

module.exports=router; 
