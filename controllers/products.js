const product=require('../db/models').product
const ads_images=require('../db/models').ads_image
const users=require('../db/models').user
const sequelize=require('sequelize')

module.exports={
    insertProduct:async(reQuery)=>{/*
        console.log("djlkjaslkfjdaslkfjlaskjflks in the transaction")
        return sequelize.transaction(function(t){
            console.log("sdfjkldjaslkjfaskl")
            return product.create({
                pname:reQuery.name,
                pprice:reQuery.price,
                pcategory:reQuery.something,
                pimage:reQuery.image,
                pabout:reQuery.abt_product,
                userId:reQuery.userId,
                pstate:reQuery.state

            },{transaction:t}).then(function(product){
                console.log("product are")
                console.log(product)
                console.log(reQuery)
                return ads_images.create({
                    iname:reQuery.image,
                    userId:reQuery.userId,
                    productId:product.pid
                },{transaction:t})
            })

        }).then((result)=>{
            console.log(result)
        })
            .catch((err)=>{
                console.log(err)
            })
*/
        product.create({
            pname:reQuery.name,
            pprice:reQuery.price,
            pcategory:reQuery.something,
            pimage:reQuery.image,
            pabout:reQuery.abt_product,
            userId:reQuery.userId,
            pstate:reQuery.state

        })

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
    }
}