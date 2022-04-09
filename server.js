// Modules imports
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const method = require('method-override')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

dotenv.config()
const app = express()

// Controllers imports
const user = require('./back/controllers/user')
const quizz = require('./back/controllers/quizz')
const crudQuizz = require('./back/controllers/crud-quizz')
const api = require('./back/controllers/api')
const classement = require('./back/controllers/classement')

// Moteur de template
app.set("view engine", "ejs");

// Middlewares
app.use("/assets", express.static("./public/assets"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: process.env.JWTSECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // if https : true
        maxAge: 7*24*60*60*1000, // 1 semaine (jours * heures * minutes * secondes * millisecondes)
    }
}))
app.use(cookieParser())
app.use(method((req, res) => { // transforme les méthodes POST qui ont des champs _method=DELETE ou _method=PUT
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method
        delete req.body._method
        return method
    }
}))
app.use(require('./back/middlewares/session'))
app.use(require('./back/middlewares/flash'))
app.use(require('./back/middlewares/verify-token'))
app.use(require('./back/middlewares/trailing-slash'))

// Controllers
app.use('/', user)
app.use('/jeu', quizz)
app.use('/mes-quizz', crudQuizz)
app.use("/api", api)
app.use('/classement', classement)

// Home page
app.get("/", (req, res) => {
    res.render("index")
})

const port = process.env.PORT
app.listen(port, () => console.log("listening on http://localhost:" + port + "/"));
