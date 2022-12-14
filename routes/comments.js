const express=require('express');
const passport=require('../config/passport-local-strategy');
const router=express.Router();

const commentsController=require('../controllers/comment_controller');

//check authentication before posting
router.post('/create',passport.checkAuthentication,commentsController.create);

router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);

module.exports=router;