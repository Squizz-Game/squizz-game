// Modules imports
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

// Controllers imports
const user = require('./back/controllers/user')
const quizz = require('./back/controllers/quizz')
const crudQuizz = require('./back/controllers/crud-quizz')
const api = require('./back/controllers/api')

const app = express()

// Moteur de template
app.set("view engine", "ejs");

// Middlewares
app.use("/assets", express.static("./public/assets"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, //if https : true
        maxAge: 604800 // 1 semaine
    }
}))
app.use(require('./back/middlewares/flash'))
app.use(require('./back/middlewares/session'))

// Controllers
app.use('/', user)
app.use('/jeu', quizz)
app.use('/mes-quizz', crudQuizz)
app.use("/api", api)

// Home page
app.get("/", (req, res) => {
  res.render("index")
})

app.listen(9090, () => console.log("listening on http://localhost:9090/"));
