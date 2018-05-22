const user=require("../db/models").user



module.exports={
    insertuser: function(r,s){
        if(r.body.password===r.body.cpassword){
            user.create({
                name:r.body.name,
                email:r.body.email,
                password:r.body.password
            }).then((user)=>{
                s.redirect(`/auth/profile`)
            })
        }
        else{
            s.redirect("/auth/signup")
        }
    }
}