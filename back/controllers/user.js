const router = require('express').Router()
const User = require('../models/user')

router.get('/deconnexion', (req, res) => {
    req.session.user_id = undefined
    // flash : à bientôt
    res.redirect('/connexion')
})

// Si non connecté :
router.get('/inscription', (req, res) => {
    if (req.session.user_id === undefined) { // Si aucun utilisateur est connecté
        res.render('inscription')
    } else {
        // flash : vous êtes déjà connecté
        res.redirect('/quizz')
    }
})

router.post('/inscription', (req, res) => {
    if (req.session.user_id === undefined) { // Si aucun utilisateur est connecté
        User.create({...req.body}, (err, data) => {
            if (!err) {
                // message succes flash
                req.session.user_id = data // on connecte l'utilisateur
                res.redirect('/quizz')
            } else {
                console.log(data)
                // message erreur flash
                res.render('inscription', {...req.body})
            }
        })
    }
})

router.get('/connexion', (req, res) => {
    if (req.session.user_id === undefined) { // Si aucun utilisateur est connecté
        res.render('connexion')
    } else {
        // flash : vous êtes déjà connecté
        res.redirect('/quizz')
    }
})

router.post('/connexion', (req, res) => {
    if (req.session.user_id === undefined) { // Si aucun utilisateur est connecté
        User.check({...req.body}, (err, data) => {
            if (!err) {
                // message succes flash
                req.session.user_id = data // on connecte l'utilisateur
                res.redirect('/quizz')
            } else {
                console.log(data)
                // message erreur flash
                res.render('connexion', {...req.body})
            }
        })
    }
})

module.exports = router