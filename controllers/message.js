const message=require("../db/models").message
let Sequelize=require('sequelize')
const Op = Sequelize.Op;

module.exports={
    insertMessage:(r,s)=>{
        message.create({
            messageBody:r.query.msg,
            senderId:r.user.userId,
            receiverId:r.query.tgt
        }).then((d)=>{
            return d;
        })
    },
    getMessage:(r,s)=>{
        message.findAll({
            where:{
                [Op.or]:[{senderId:r.user.userId},{receiverId:r.user.userId}]
            }
        }).then((d)=>{
            return (d)
        })
    },
}