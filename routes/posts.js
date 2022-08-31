const express=require('express');
const passport=require('../config/passport-local-strategy');
const router=express.Router();

const postController=require('../controllers/posts_controller');

//check authentication before posting
router.post('/create',passport.checkAuthentication,postController.create);

router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);

module.exports=router;