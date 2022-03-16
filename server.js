const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const home = require('./back/controllers/home')

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
app.use('/', home)

app.listen(9090, () => console.log('listening on http://localhost:9090/'))