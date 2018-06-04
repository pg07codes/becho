const router=require('express').Router()
const ctrl=require('../controllers/products')
const multer=require('multer')
const path=require('path')
const fs=require('fs')
const upload = multer({dest: 'uploads/'})

router.get('/',(r,s)=>{
    if(!r.user)
    {
        s.redirect('./auth/signin')
    }
    else
    {

        ctrl.searchProduct(r)
            .then((data)=>{
                s.send(data)})
            .catch((err)=>{
                s.status(404).json({err:"sorry no product find"})

            })

    }

})
router.get('/search',(r,s)=>{
    s.send("hi")
})

router.post('/search',(r,s)=>{

    if(r.body.state==="")
    {
        let data={
            warning:"Select the location"
        }
        s.render("home",{data})

    }
    else{
        if(r.body.category==='')
        {
            let data={
                warning:"Select the category"
            }
            s.render("home",{data})
        }
        else{
            ctrl.searchProduct(r.body)
                .then((result)=>{
                   // console.log(data)
                        let data
                        if(r.body.state==='India')
                        {
                            data=result
                        }
                        else
                        {

                            filter_state=function(item){
                                console.log(item.pstate)
                                console.log("kdjals"+r.body.state)
                                if(item.pstate===r.body.state){
                                    return true
                                }
                            }
                            data=result.filter(filter_state);
                        }
                        //s.status(202).json({data})
                        if(data.length===0)
                        {
                            data['warning']="Sorry no product found"
                        }
                            s.render("home",{data})


                })
                .catch((err)=>{
                   // s.send(err)
                    s.status(404).json({err:err})

                })
        }
    }
})
router.post('/', upload.single('photo'), (req, res) => {
    if(!req.user)
    {
        res.redirect('./auth/signin')
    }
    else
    {
        let unlink=0
        const filetypes=/jpeg|jpg|gif|png/

        console.log("mimetype is "+(req.file.mimetype))
        const extname=filetypes.test(path.extname(req.file.originalname))           //checking the extension of the uploaded file
        const mimetype=filetypes.test(req.file.mimetype)
      //  console.log(extname)
        //console.log(mimetype)
        if(mimetype )
        {

            fs.readFile(req.file.path, (err, data) => {
                fs.writeFile('assets/upload/'+req.file.originalname, data, (err) => {
                    console.log(err)

                    fs.unlink(req.file.path, () => {})
                })
                unlink=1

            })

            if(unlink){
                res.redirect('/profile')
            }
            else{

                req.body['image']=req.file.originalname
                console.log(req.user.id)
                req.body['userId']=req.user.id

                ctrl.insertProduct(req.body)
                    .then(()=>{
                        res.redirect('/profile')
                    })
                    .catch((err)=>{
                        res.redirect('/profile')
                    })
            }
        }
        else
        {
            res.send("upload right document")
        }
    }
})
module.exports=router // no need to bind exports to module exports unless u are using exports object-- OK sachin sir...