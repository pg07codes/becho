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
router.get('/search/:id',(r,s)=>{
    //console.log(r.params.id)
    ctrl.get_particular_Add(r.params)
        .then((results)=>{
            //console.log(results.dataValues)
            let req={user:{ }}
            req['user'].id=results.userId
            ctrl.myAds(req)
                .then((data)=>{
                    let del_index                                       //to remove the product which is already..
                                                                        // present in the result
                    data.forEach((item,index)=>{
                        //console.log(item.dataValues.pid)
                        if(item.dataValues.pid===parseInt(r.params.id)){
                            del_index=index
                            console.log("index is"+index)
                        }
                    })
                    data.splice(del_index,1)
                    /*for(let i=0;i<data.length;i++)
                    {
                        console.log(data[i])
                        console.log(data[i].dataValues.pid)
 >>doubt why ===(true here 4 every case>>>        //if(toString(data[i].dataValues.pid)===toString(r.params.id)){
                           console.log("found"+data[i].dataValues.pid)
                    }
                    }*/
                    data['specific']=results.dataValues
                    s.render('desc_product',{data:data,r:r})
                })


        })

})
router.get('/search',(r,s)=>{
    s.send("Cannot 'GET' this page . please go BACK.")
})
router.post('/search',(r,s)=>{
    if(r.isAuthenticated())
    {
        r.body['userId']=r.user.id

    }
    if(r.body.state==="")
    {
        let data={
            warning:"Select the location"
        }
        if(r.user){
            data['user']=r.user.name
        }
        //console.log(data)
        s.render("home",{data:data,r:r})

    }
    else{
        if(r.body.specific_product==='')
        {
            if(r.body.category==='')
            {
                let data={
                    warning:"Select the category"
                }
                if(r.user){
                    data['user']=r.user.name
                }
                //console.log(data)
                s.render("home",{data:data,r:r})
            }
            else
            {

                ctrl.searchProduct(r.body)
                    .then((data)=>{
                        //console.log(data)
                        if(data.length===0)
                        {
                            data['warning']="Sorry no product found"
                        }
                        if(r.user){
                            data['user']=r.user.name
                        }

                        s.render("home",{data:data,r:r})


                    })
                    .catch((err)=>{
                        // s.send(err)
                        s.status(404).json({err:err})

                    })

            }

        }
        else
        {
            ctrl.search_spec_product(r.body)
                .then((data)=>{
                    if(data.length===0)
                    {
                        data['warning']="Sorry no product found"
                    }
                    if(r.user){
                        data['user']=r.user.name
                    }
                   // console.log(data)
                    s.render("home",{data:data,r:r})

                })
        }

    }
})
router.post('/', upload.array('photo',3), (req, res) => {
    if(!req.user)
    {
        res.redirect('./auth/signin')
    }
    else
    {
        //console.log(req)
        let unlink=0
        const filetypes=/jpeg|jpg|gif|png/
        console.log(req.files.length)
        for(let i=0;i<req.files.length;i++)
        {

            console.log("mimetype is "+(req.files[i].mimetype))
            const extname=filetypes.test(path.extname(req.files[i].originalname))           //checking the extension of the uploaded file
            const mimetype=filetypes.test(req.files[i].mimetype)
            if(mimetype)
            {
                fs.readFile(req.files[i].path, (err, data) => {
                    fs.writeFile('assets/upload/'+req.files[i].originalname, data, (err) => {
                        //console.log(err)
                        fs.unlink(req.files[i].path, () => {})
                    })
                    unlink=1
                })
                if(unlink)
                {
                    res.redirect('/profile')
                }
                else
                {
                    req.body['image'+i]=req.files[i].originalname
                }

            }
            else
            {
                res.send("upload right type of document")
            }

            if(i===parseInt(req.files.length)-1)
            {
                console.log("done")
                req.body['userId']=req.user.id
                console.log(req.body)
                //req.body['number']=req.files.length
                ctrl.insertProduct(req.body)
                    .then(()=>{
                        res.redirect('/profile/myadvertisements')
                    })
                    .catch((err)=>{
                        res.redirect('/profile/myadvertisements')
                    })
            }

        }
      //  console.log(extname)
        //console.log(mimetype)
       /* if(mimetype )
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
                req.body['number']=2
                ctrl.insertProduct(req.body)
                    .then(()=>{
                        res.redirect('/profile/myadvertisements')
                    })
                    .catch((err)=>{
                        res.redirect('/profile/myadvertisements')
                    })
            }
        }
        */
    }
})
module.exports=router // no need to bind exports to module exports unless u are using exports object-- OK sachin sir...