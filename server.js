const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const user = require('./back/controllers/user')
const quizz = require('./back/controllers/quizz')

const app = express()

// Moteur de template
app.set('view engine', 'ejs')

// Middlewares
app.use('/assets', express.static('./public/assets'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } //if https : true
}))
app.use(require('./back/middlewares/flash'))

// Controllers
app.use('/', user)
app.use('/quizz', quizz)

// Home page
app.get('/', (req, res) => {
    res.render('index')
})

app.listen(9090, () => console.log('listening on http://localhost:9090/'))