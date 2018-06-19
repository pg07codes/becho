const product=require('../db/models').product
const ads_images=require('../db/models').ads_image
const users=require('../db/models').user
const db=require('../db/models').db
const bookmark=require('../db/models').bookmark

module.exports={
    insertProduct:async(reQuery)=>{
        return db.transaction(function(t){

            return product.create({
                pname:reQuery.name,
                pprice:reQuery.price,
                pcategory:reQuery.something,
                pabout:reQuery.abt_product,
                userId:reQuery.userId,
                pstate:reQuery.state
            },{transaction:t})
                .then((product)=>{
                   // for(let i=0;i<reQuery.number;i++)     why this loop is not working here
                    if(reQuery.image0)
                    {
                        //console.log(product.pid)
                        return ads_images.create({
                            name:reQuery.image0,
                            productPid:product.pid
                        },{transaction:t}).then((ads)=>{
                            if(reQuery.image1)
                            {
                                //console.log(product.pid)
                                return ads_images.create({
                                    name:reQuery.image1,
                                    productPid:product.pid
                                },{transaction:t})
                                    .then((ads)=>{
                                        if(reQuery.image2)
                                        {
                                            return ads_images.create({
                                                name:reQuery.image2,
                                                productPid:product.pid
                                            },{transaction:t})
                                                .then(()=>{
                                                    console.log("third added")
                                                })
                                        }
                                    }).catch((err)=>{
                                        console.log(err)
                                    })
                            }
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }


            })

        })
            .catch((err)=>{
                console.log(err)
            })

    },
    searchProduct:(requery)=>{
        if(requery.state==='India')
        {

            return product.findAll({
                where:{
                    pcategory:requery.category
                },include:[{
                    model:bookmark,
                    where:{
                        userId:requery.userId
                    },
                    required:false                      // so that add which are not bookmarked would
                                                        // also be their in result of search
                },{
                    model:ads_images,
                }]
            })
        }
        else{

            return product.findAll({
                where:{
                    pcategory:requery.category,
                    pstate:requery.state
                },include:[{
                    model:ads_images
                }]
            })
        }
    },
    search_spec_product:(requery)=> {
        if(requery.id)
        {
            return product.findOne({
                where:{
                    pid:requery.id
                },include:[{
                    model:ads_images
                }]
            })
        }
        else{
            return product.findAll({
                where:{
                    pname:{
                        $like:'%'+requery.specific_product+'%'

                    }
                },include:[{
                    model:ads_images
                }]
            })
        }

    },
    myAds:(r,s)=>{
        return (product.findAll({
                where:{
                    userId:r.user.id
                },include:[
                    {
                        model:ads_images
                    }
                ]
            })
        )
    },
    deleteAdd:(requery)=>{
        return db.transaction((t)=>{
            return product.destroy({
                where:{
                    pid:requery.id
                }
            },{transaction:t}).then((result)=>{
                if(result){
                    return ads_images.destroy({
                        where:{
                            productPid:requery.id
                        }
                    },{transaction:t})
                }
            })
        })
    },
    get_particular_Add:(requery)=>{
        return product.findOne({
            where:{
                pid:requery.id
            },include:[{
                model:ads_images
            }]
        })
    },
    adBookmark:(requery) => bookmark.create({
    userId:requery.dataValues.id,
    productPid:requery.postId
}),
    delBookmark:(requery)=>{
        return bookmark.destroy({
            where:{
                productPid:requery.id,
                userId:requery.userId
            }
        })
    },
    getbookmark:async(requery)=>{
        /*return bookmark.findAll({
            where:{
                userId:requery.user.id              this is the right way to get all the bookmarks but to use the
                                                    search template as it is i have use otherway which is bad practice
            },include:[{
                model:product
            }]
        })*/
        return product.findAll({
            where:{

            },include:[{
                model:bookmark,
                where:{
                    userId:requery.user.id
                }
            },{
                model:ads_images
            }]
        })
    }

}