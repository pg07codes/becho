const router=require('express').Router()
router.get('/',(r,s)=>{
    if(r.user)
    {   let user={}
        user.name=r.user.name           //if user is authentiated then user form will hva filled details
        user.id=r.user.id
        user.phn=r.user.phn
        user.location=r.user.location
        s.render('product',{user})
    }
    else{
        s.render('Product')             //else no user detail will be there
    }
})
exports=module.exports=router