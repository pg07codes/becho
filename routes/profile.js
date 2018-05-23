const router=require('express').Router()
const multer=require('multer')
const path=require('path')
const fs=require('fs')
const upload = multer({dest: 'uploads/'})


router.get('/',(r,s)=>{
    if(r.isAuthenticated())
        s.render('profile',{title:'profile'})
    else
        s.redirect('./auth/signin')
})


router.post('/',(req, res) => {

})
module.exports=router