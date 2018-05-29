const router=require('express').Router()
router.get('/',(r,s)=>{
    if(r.isAuthenticated())
    {   let user={}
        user.name=r.user.name           //if user is authentiated then user form will hva filled details
        user.id=r.user.id
        user.phn=r.user.phn
        user.location=r.user.location
        s.render('product',{user,r:r})
    }
    else{
        s.redirect('/auth/signin?sell=true')             //else you have to sign in first
    }
})
exports=module.exports=router