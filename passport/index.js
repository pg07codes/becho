const passport = require('passport')
const strategies = require('./strategies')
const user = require('../db/models').user

passport.use(strategies.localStrategy)

passport.serializeUser(function (user, done) {

    console.log('serialize' + user.email)
    done(null, user.email)
})

passport.deserializeUser(function(useremail, done) {

    console.log('deserialize' + useremail)
    user.findOne({
        where: {email: useremail}
    })
        .then((user) => done(null, user))
        .catch((err) => done(err))
})

exports = module.exports = passport