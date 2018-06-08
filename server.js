//requiring files here
const express = require("express")
const path = require("path")
const hbs=require("express-hbs")
const passport=require("./passport")
const expressSession=require("express-session")
const SessionStore=require('express-session-sequelize')(expressSession.Store)
const cookieParser=require('cookie-parser')
const db=require('./db/models').db
const app = express()


////express session store//////////

const sequelizeSessionStore=new SessionStore({
    db:db
})
app.use(cookieParser())
app.use(expressSession({
    secret:"random salt",
    resave:false,
    saveUninitialized:false,
    store:sequelizeSessionStore
}))

//testing socketssssss
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', function(socket) {
    console.log(socket.id)
    socket.emit('news', {hello: 'world'})
})
//till here............

//serving files and parsing request body
app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use(passport.initialize())
app.use(passport.session())

app.use("/assets", express.static(path.join(__dirname, "assets")))
//setting up of the view engine
app.set("view engine","hbs")
app.set("views","views")
app.engine("hbs",hbs.express4({
    defaultLayout: path.join(__dirname, 'views/layouts/default.hbs'),
    partialsDir: path.join(__dirname, 'views/partials'),
    layoutsDir: path.join(__dirname, 'views/layouts')
}))

//home route
app.get("/",(r,s)=>{
    if(r.isAuthenticated())
        s.redirect("/profile")//to stop user from going to "/" when logged in
    else
    s.render("home",{undefined,title:"ghar",r:r})
})
app.use("/sell",require('./routes/Rsell'))
app.use("/auth",require('./routes/authroutes'))
app.use("/product",require('./routes/RProduct'))
app.use("/profile",require('./routes/profile'))

//server starts listening
server.listen(8888, () =>
    console.log("up at http://localhost:8888")
)

module.exports=app;