module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',450909654)
    // console.log(req.cookies);

    return res.render('home',{
        title:'Home'
    })
}
