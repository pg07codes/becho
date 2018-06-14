const passport = require('passport')
const strategies = require('./strategies')
const user = require('../controllers/insertuser')


passport.use(strategies.localStrategy)
passport.use(strategies.googleStrategy)
passport.serializeUser(function (user, done) {

    console.log( user.email)
    done(null, user.email)
})

passport.deserializeUser(function(useremail, done) {

    console.log('deserialize' + useremail)
    let query={    }
    query['email']=useremail
    user.getUser(query)
        .then((user) => done(null, user))
        .catch((err) => done(err))
})

exports = module.exports = passport