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
    }
})

user.hasMany(product)
product.belongsTo(user)


db.sync().then(()=>console.log("db is synced"))


module.exports={db,user}
