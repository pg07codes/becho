const router=require('express').Router()
const multer=require('multer')
const path=require('path')
const fs=require('fs')
const upload = multer({dest: 'uploads/'})


router.get('/',(r,s)=>{
    if(r.isAuthenticated())
    {
        user={}
        user.name=r.user.name
        user.id=r.user.id
        s.render('profile',{user,title:"Profile"})
    }
    else
        s.redirect('./auth/signin')
})


router.post('/',(req, res) => {

})
module.exports=router