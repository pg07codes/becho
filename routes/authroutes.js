let router=require("express").Router()
let passport=require('../passport')
let insertuser=require("../controllers/insertuser").insertuser

router.get("/signup",(r,s)=>{
    s.render("signup",{r:r})
})
router.post("/signup",(r,s)=>{
    insertuser(r,s)
})

router.get("/signin",(r,s)=>{
    s.render("signin",{r:r})
})

router.post("/signin",passport.authenticate('local', {
    successRedirect: `/auth/profile`,
    failureRedirect: '/?ein=true'
}))
router.get("/signout",(r,s)=>{
    r.user=null
    r.logout()
    r.session.destroy((err)=>{
        s.redirect('/auth/signin')
    })
})

router.get("/profile",(r,s)=> {
    s.redirect(`/profile`)
})

module.exports=router