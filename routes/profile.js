const router=require('express').Router()
const multer=require('multer')
const path=require('path')
const fs=require('fs')
const upload = multer({dest: 'uploads/'})
/*const storage=multer.diskStorage({
    destination:'public/upload',
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
        console.log("1")
    }

})
const upload=multer({
    storage:storage,
    limits:{fileSize:10000000},
    fileFilter:function(req,file,cb){
        checkFileType(file,cb)
    }
}).single('Mypost')
const checkFileType=function(file,cb){
    const filetypes=/jpeg|jpg|gif|png/
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype=filetypes.test(file.mimetype)
    if(mimetype && extname)
    {
        cb(null,file)
    }
    else{
        "err: input type of file is not valid"
    }
}
*/

router.get('/',(r,s)=>{
    if(r.isAuthenticated())
        s.render('profile',{title:'profile'})
    else
        s.redirect('./auth/signin')
})


router.post('/', upload.single('photo'), (req, res) => {
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
        })
        res.redirect('/profile')
    }
    else
    {
        res.send("upload right document")
    }
})
module.exports=router