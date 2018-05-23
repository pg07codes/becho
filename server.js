//requiring files here
const express = require("express")
const path = require("path")
const hbs=require("express-hbs")
const passport=require("./passport")
const session=require("express-session")
const app = express()


//serving files and parsing request body
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(session({
    secret:"random salt",
    resave:false,
    saveUninitialized:false
}))

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
    s.render("home",{title:"ghar"})
})

app.use("/auth",require('./routes/authroutes'))
app.use("/searchProduct",require('./routes/searchProduct'))
//server starts listening
app.listen(8888, () =>
    console.log("up at http://localhost:8888")
)