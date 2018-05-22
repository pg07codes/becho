//requiring files here
const express = require("express")
const path = require("path")
const hbs = require("express-hbs")
const app = express()


//serving files and parsing request body
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/assets", express.static(path.join(__dirname, "assets")))


//setting up of the view engine
app.set("view engine", "hbs")
app.set("views", "views")
app.engine("hbs", hbs.express4({
    defaultLayout: path.join(__dirname, 'views/layouts/default.hbs'),
    partialsDir: path.join(__dirname, 'views/partials'),
    layoutsDir: path.join(__dirname, 'views/layouts')
}))


//home route
app.get("/", (r, s) => {
    s.send("home page")
})

//server starts listening
app.listen(8888, () =>
    console.log("up at http://localhost:8888")
)