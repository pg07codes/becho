const product=require('../db/models').product

module.exports={
    insertProduct:async(reQuery)=>{
        product.create({
            pname:reQuery.name,
            pprice:reQuery.price,
            pcategory:reQuery.something,
            pimage:reQuery.image,
            pabout:reQuery.abt_product
        })
            /*.then(()=>{
                res.status(201).json({
                    success:'true'
                })
            })
            .catch((err)=>{
                res.status(404).json({
                    success:'false'
                })
            })*/
    },
    searchProduct:(requery)=>{
        return product.findAll({
            where:{
                pcategory:requery.category
            }
        })
    }
}