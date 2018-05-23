let router=require("express").Router()
let passport=require('../passport')
let insertuser=require("../controllers/insertuser")

router.get("/signup",(r,s)=>{
    s.render("signup")
})
router.post("/signup",(r,s)=>{
    insertuser(r,s)
})

router.get("/signin",(r,s)=>{
    s.render("signin")
})

router.post("/signin",passport.authenticate('local', {
    successRedirect: `/auth/profile`,
    failureRedirect: '/?ein=true'
}))
router.get("/signout",(r,s)=>{

})

router.get("/profile",(r,s)=> {
    s.redirect(`/profile`)
})

module.exports=router