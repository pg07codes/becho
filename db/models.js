const Sequelize=require('sequelize')
const dt=Sequelize.DataTypes

const dbconfig=require('../config').DB
const db=new Sequelize(dbconfig.NAME,dbconfig.USER,dbconfig.PASSWORD,{
    dialect:'mysql'
})

// const db = new Sequelize(process.env.DATABASE_URL);

//define models here

//user table here
const user=db.define("user",{
    id:{
        autoIncrement:true,
        primaryKey:true,
        type:dt.INTEGER
    },
    name:{
        allowNull:false,
        type:dt.STRING
    },
    email:{
        allowNull:false,
        unique:true,
        type:dt.STRING
    },
    password:{
        //allowNull:false,
        type:dt.STRING
    },
    location:{
        //allowNull:false,
        type:dt.STRING
    },
    state:{
        //allowNull:false,
        type:dt.STRING
    },
    phn:{
        //allowNull:false,
        type:dt.STRING(12)
    },
    googleId:{
        type:dt.STRING
    }

})


//products table here
const product=db.define("product",{
    pid:{
        autoIncrement:true,
        primaryKey:true,
        type:dt.INTEGER
    },
    pname:{
        allowNull:false,
        type:dt.STRING
    },
    pprice:{
        type:dt.INTEGER,
        allowNull:false,

    },
    pcategory:{
        allowNull:false,
        type:dt.STRING
    },
    pabout:{
        allowNull:false,
        type:dt.STRING
    },
    pstate:{
        allowNull:false,
        type:dt.STRING
    }
})

//bookmark table is here////
/*const ads_image=db.define('ads_image',{
    iname:{
        allowNull:false,
        type:dt.STRING
    }
})*/
//product.hasMany(ads_image)
//user.hasMany(ads_image)


bookmark=db.define("bookmark",{
    bid:{
        autoIncrement:true,
        primaryKey:true,
        type:dt.INTEGER
    },

})

user.hasMany(bookmark)
product.hasMany(bookmark)

bookmark.belongsTo(user)
bookmark.belongsTo(product)


user.hasMany(product)
product.belongsTo(user)

//no relation like hasmany and belongsto used in message table to avoid any complexity.....
message=db.define("message",{
    chatId:{
        autoIncrement:true,
        primaryKey:true,
        type:dt.INTEGER
    },
    messageBody:{
        type:dt.STRING,
        allowNull:false
    },
    senderId:{
        type:dt.INTEGER,
        allowNull:false
    },
    receiverId:{
        type:dt.INTEGER,
        allowNull:false
    }

})
const ads_image=db.define('adsImage',{
    name:{
        type:dt.STRING,
        allowNull:false
    }
})
product.hasMany(ads_image)
db.sync({
   //alter:true
    //force:true
}).then(()=>console.log("db is synced"))

//module.exports={db,user,product,ads_image}
module.exports={db,user,product,bookmark,message,ads_image}
