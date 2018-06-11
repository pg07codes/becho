const router=require('express').Router()
const multer=require('multer')
const path=require('path')
const fs=require('fs')
const upload = multer({dest: 'uploads/'})
const ctrl=require("../controllers/products")
const Hashids=require('hashids')

let hash=new Hashids()
router.get('/',(r,s)=>{
    if(r.isAuthenticated())
    {
        console.log("sjflkasjflksjflk"+r.isAuthenticated())
        let user={}
        user.name=r.user.name
        user.id=r.user.id
        s.render('profile',{user,title:"Profile",r:r,})
    }
    else
        s.redirect('./auth/signin')
})
router.get("/myadvertisements",(r,s)=>{
   if(r.isAuthenticated()){
       ctrl.myAds(r,s).then((data)=>{
           let isEmpty= (data.length===0)
           console.log(data)
           data.forEach(function(ele){
               //console.log(ele.dataValues.pid)
               //console.log(hash.encode(ele.dataValues.pid))

               ele.dataValues.pid=''+(hash.encode(ele.dataValues.pid))
           })
           s.render("myAds",{title:"My Ads",data:data,r:r,isEmpty:isEmpty})
       })
   }
   else
       s.redirect("/auth/signin")
})

router.delete("/myadvertisement/delete",(r,s)=>{
    console.log("post id is "+r.body.id)
    console.log("post id is "+hash.decode(r.body.id))

    r.body.id=hash.decode(r.body.id)

    ctrl.get_particular_Add(r.body)
        .then((data)=>{
            console.log(data.dataValues.pimage)
            fs.unlink('assets/upload/'+data.dataValues.pimage,(err)=>{ //uploading same photo will cause an error here
                 if(err){
                     s.status(400).json({
                         err:err
                     })
                 }
                 else
                // THIS PART MAY CAUSE UNEXPECTED ERROR DURING TESTING SO IT IS BEING COMMENTED FOR NOW.....
                {

                    ctrl.deleteAdd(r.body)
                        .then(()=>{
                            s.status(200).json({
                                success:"deleted"
                            })
                        })
                }
            })
        })

})

router.get("/editDetails",(r,s)=>{
   if(r.isAuthenticated())
       s.render("editDetails",{r:r})
   else
       s.redirect("/auth/signin")

})

router.get("/chats",(r,s)=>{
    if(r.isAuthenticated())
        s.render("chats",{title:"Chats",r:r})
    else
        s.redirect("/auth/signin")
})

router.get("/bookmarks",(r,s)=>{
    if(r.isAuthenticated())
        s.render("bookmarks",{title:"Bookmarked Ads",r:r})
    else
        s.redirect("/auth/signin")
})

router.post("/bookmarks/:id",(r,s)=>{
    if(r.isAuthenticated())
    {
        //console.log(r.user)
        r['user'].postId=r.params.id
       // console.log("bookmark body is "+r.body.id)
        let stat=ctrl.adBookmark(r.user)
        s.status(200).json({
            success:"added"
        })
    }
    else
        s.redirect("/auth/signin")
})
router.delete("/bookmarks/:id",(r,s)=>{
    //console.log("delelte request reached")
    r.params['userId']=r.user.id
    ctrl.delBookmark(r.params)
        .then(()=>{
            s.status(200).json({
                success:"deleted"
            })
        })

})
module.exports=router