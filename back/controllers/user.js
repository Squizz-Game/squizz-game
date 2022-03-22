const router = require('express').Router()
const User = require('../models/user')

router.get('/deconnexion', (req, res) => {
    req.session.user_id = undefined
    // flash : à bientôt
    res.redirect('/connexion')
})

// Si connecté :
router.get('/mon-compte', (req, res) => {
    if (req.session.user_id !== undefined) { // Si un utilisateur est connecté
        console.log('utilisateur:', req.session.user_id)
        User.get({...req.session}, (err, data) => {
            if (!err) {
                return res.render('mon-compte', { ...data })
            } else {
                res.redirect('/connexion')
            }
        })
    } else {
        // flash : vous n'êtes pas connecté
        res.redirect('/connexion')
    }
})

router.post('/mon-compte', (req, res) => {
    if (req.session.user_id !== undefined) { // Si un utilisateur est connecté
        User.update({...req.body, id_user: req.session.user_id}, (err, data) => {
            if (err) {
                console.log('error :', data)
                // flash: error
                return res.render('mon-compte', { ... req.body })
            } else {
                // flash: succès
                console.log(data)
                return res.redirect('/quizz')
            }
        })
    } else {
        // flash : vous n'êtes pas connecté
        res.redirect('/connexion')
    }
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