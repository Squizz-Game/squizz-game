const router = require('express').Router()
const User = require('../models/user')

router.get('/', (req, res) => {
    res.render('index')
})

// Si non connecté :
router.get('/inscription', (req, res) => {
    res.render('inscription')
})

router.post('/inscription', (req, res) => {
    console.log(req.body)

    User.create({...req.body}, (err, data) => {
        if (!err) {
            console.log(data) // id user
            //ajouter le user en session
            res.send('to-do: connexion')
            // res.render('connexion')
        } else {
            console.log(data)
            // message erreur flash
            res.render('inscription', {...req.body})
        }
    })
})

module.exports = router