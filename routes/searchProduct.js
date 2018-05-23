const route=require('express').Router()
route.post('/',(r,s)=>{
    s.send("hi")
})
exports=module.exports=route