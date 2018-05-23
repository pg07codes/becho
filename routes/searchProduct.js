const router=require('express').Router()
const ctrl=require('../controllers/products')
router.get('/',(r,s)=>{

})
router.post('/',(r,s)=>{
    ctrl.searchProduct(r)
        .then((data)=>{
            s.send(data)})
                .catch((err)=>{
                    s.status(404).json({err:"sorry no product find"})

                })

})
exports=module.exports=router