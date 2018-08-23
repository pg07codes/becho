const LocalStrategy = require('passport-local').Strategy
const user = require('../db/models').user
// const google=require('../config').google
const insertuser=require('../controllers/insertuser')
const passport=require('passport')
const localStrategy = new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, done) => {
        user.findOne({
            where: {
                email: email
            }
        }).then((user) => {

            if (!user) {
                //Wrong username
                return done(null, false, {message: 'Wrong email'})
            }
            if (user.password === password) {
                // Correct user and password
                return done(null, user)
            } else {
                // Correct username, wrong password
                return done(null, false, {message: 'Wrong password'})
            }

        }).catch((err) => {
            return done(err)
        })
    })
const GoogleStrategy= require('passport-google-oauth20')
const googleStrategy=(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL :"https://becho.herokuapp.com/auth/google/callback"
},
    function(accessToken,refreshToken,profile,done){
        console.log(profile)
        user.findOne({where:{googleId:profile.id}})
            .then((user)=>{
                if(user)
                {
                    done(null,user)
                }
                else
                {
                    profile['email']=profile.displayName+'@gmail.com'
                    insertuser.insertAsGuser(profile)
                        .then((user)=>{
                            console.log(user)
                            done(null,user)
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                }

            })
            .catch((err)=>{
                console.log(err)
            })
    }))

exports = module.exports = {
    localStrategy,googleStrategy
}