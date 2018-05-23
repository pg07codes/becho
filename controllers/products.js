const product=require('../db/models').product
module.exports={
    insertProduct:()=>{

    },
    searchProduct:(requery)=>{
        return product.findAll({
            where:{
                pcategory:requery.category
            }
        })
    }
}