const product=require('../db/models').product
const users=require('../db/models').user
const bookmark=require('../db/models').bookmark

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
        if(requery.state==='India')
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
                    pstate:requery.state
                }
            })
        }
    },
    search_spec_product:(requery)=> {
        if(requery.id)
        {
            console.log("sdfhjashfk"+requery)
            console.log(requery.id)
            return product.findOne({
                where:{
                    pid:requery.id
                }
            })
        }
        else{
            return product.findAll({
                where:{
                    pname:{
                        $like:'%'+requery.specific_product+'%'

                    }
                }
            })
        }

    },
    myAds:(r,s)=>{
        return (product.findAll({
                where:{
                    userId:r.user.id
                }
            })
        )
    },
    deleteAdd:(requery)=>{
        return product.destroy({
            where:{
                pid:requery.id
            }
        })
    },
    get_particular_Add:(requery)=>{
        return product.findOne({
            where:{
                pid:requery.id
            }
        })
    },
    adBookmark:(r,s) => bookmark.create({
    userId:r.user.userId,
    pid:r.params.id
})

}