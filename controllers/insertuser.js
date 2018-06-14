const user=require("../db/models").user
module.exports={
    insertuser: function(r,s){
        if(r.body.password===r.body.cpassword){
            if(r.body.password===r.body.password)
            user.create({
                name:r.body.name,
                email:r.body.email,
                password:r.body.password,
                phn:r.body.phn,
                state:r.body.state,
                location:r.body.location
            }).then((user)=>{
                s.redirect(`/auth/profile`)
            })
        }
        else{
            s.redirect("/auth/signup?eup=true")
        }
    },
    insertAsGuser:(requery)=>{
        return user.create({
            name:requery.displayName,
            googleId:requery.id,
            email:requery.email
        })
    },
    updateUser:(r)=>{
       return user.update({
            name:r.body.name,
            password:r.body.password,
            phn:r.body.phn,
            state:r.body.state,
            location:r.body.location,
            email:r.body.email},{
            where:{
                id:r.user.id
            }
        })
    },
    getUser:async(requery)=>{
        return user.findOne({
            where:{
                email:requery.email
            }
        })
    },
}
