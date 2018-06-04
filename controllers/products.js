const product=require('../db/models').product
const users=require('../db/models').user

module.exports={
    insertProduct:async(reQuery)=>{
        product.create({
            pname:reQuery.name,
            pprice:reQuery.price,
            pcategory:reQuery.something,
            pimage:reQuery.image,
            pabout:reQuery.abt_product,
            userId:reQuery.userId,
            pstate:reQuery.state

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
        if(requery.location==='India'||requery.location==='INDIA')
        {

            return product.findAll({
                where:{
                    pcategory:requery.category
                }
            })
        }
        else{

            return product.findAll({
                where:{
                    pcategory:requery.category,
                }
            })
        }
    }
}