// Modules imports
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const method = require('method-override')

// Controllers imports
const user = require('./back/controllers/user')
const quizz = require('./back/controllers/quizz')
const crudQuizz = require('./back/controllers/crud-quizz')
const api = require('./back/controllers/api')
const classement = require('./back/controllers/classement')

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
app.use(method((req, res) => { // transforme les méthodes POST qui ont des champs _method=DELETE ou _method=PUT
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method
        delete req.body._method
        return method
    }
}))
app.use(require('./back/middlewares/session'))
app.use(require('./back/middlewares/flash'))

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

app.listen(9090, () => console.log("listening on http://localhost:9090/"));
