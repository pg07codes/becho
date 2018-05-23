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

router.post('/', upload.single('photo'), (req, res) => {
    if(!req.user)
    {
        res.redirect('./auth/signin')
    }
    else
    {
        let unlink=0
        const filetypes=/jpeg|jpg|gif|png/
        const extname=filetypes.test(path.extname(req.file.originalname))           //checking the extension of the uploaded file
        const mimetype=filetypes.test(req.file.mimetype)
        if(mimetype && extname)
        {

            fs.readFile(req.file.path, (err, data) => {
                fs.writeFile('public/upload/'+req.file.originalname, data, (err) => {
                    console.log(err)

                    fs.unlink(req.file.path, () => {})
                })
                unlink=1

            })

            if(unlink){
                res.redirect('/profile')
            }
            else{

                console.log(req)
                console.log("req body is ")
                console.log(req.body)
                req.body['image']=req.file.originalname
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
exports=module.exports=router