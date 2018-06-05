const router=require('express').Router()
const multer=require('multer')
const path=require('path')
const fs=require('fs')
const upload = multer({dest: 'uploads/'})
const ctrl=require("../controllers/products")


router.get('/',(r,s)=>{
    if(r.isAuthenticated())
    {
        console.log("sjflkasjflksjflk"+r.isAuthenticated())
        let user={}
        user.name=r.user.name
        user.id=r.user.id
        s.render('profile',{user,title:"Profile",r:r})
    }
    else
        s.redirect('./auth/signin')
})
router.get("/myadvertisements",(r,s)=>{
   if(r.isAuthenticated()){
       ctrl.myAds(r,s).then((data)=>{
           let isEmpty= (data.length===0)
           s.render("myAds",{title:"My Ads",data:data,r:r,isEmpty:isEmpty})
       })
   }
   else
       s.redirect("/auth/signin")
})
module.exports=router