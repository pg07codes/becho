const Sequelize=require('sequelize')
const dt=Sequelize.DataTypes

const dbconfig=require('../config').DB

const db=new Sequelize(dbconfig.NAME,dbconfig.USER,dbconfig.PASSWORD,{
    dialect:'mysql'
})

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
        allowNull:false,
        type:dt.STRING
    },
    location:{
        allowNull:false,
        type:dt.STRING
    },
    state:{
        allowNull:false,
        type:dt.STRING
    },
    phn:{
        allowNull:false,
        type:dt.STRING(12)
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
    pimage:{
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

bookmark=db.define("bookmark",{
    bid:{
        autoIncrement:true,
        primaryKey:true,
        type:dt.INTEGER
    },
    pid:{
        type:dt.INTEGER,
        allowNull:false
    }
})

user.hasMany(bookmark)
bookmark.belongsTo(user)

user.hasMany(product)
product.belongsTo(user)


db.sync({
    //alter:true
    //force:true
}).then(()=>console.log("db is synced"))


module.exports={db,user,product,bookmark}
