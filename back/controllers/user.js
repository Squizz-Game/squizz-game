const router = require('express').Router()
const User = require('../models/user')
const mysql = require('../models/mysql')
const Score = require('../models/score')
const jwt = require('jsonwebtoken')
const fs = require('fs')

router.get('/deconnexion', (req, res) => {
    req.session.id_user = undefined
    res.clearCookie('token')
    req.flash('success', 'À bientôt !')
    res.redirect('/')
})

// Si connecté :
router.get('/mon-compte', (req, res) => {
    if (req.session.id_user !== undefined) {
        // Si un utilisateur est connecté
        User.get(req.session.id_user, (err, data) => {
            if (!err) {
                mysql.query('SELECT * FROM `avatars`', (err, avatars) => {
                    console.log(data)
                    console.log(err)
                    return res.render('user/update', { ...data, avatars })
                })
            } else {
                req.flash('error', "Une erreur s'est produite.")
                res.redirect('/connexion')
            }
        })
    } else {
        req.flash('error', "Vous n'êtes pas connecté.")
        res.redirect('/connexion')
    }
})

router.post('/mon-compte', (req, res) => {
    if (req.session.id_user !== undefined) {
        // Si un utilisateur est connecté
        User.update(
            { ...req.body, id_user: req.session.id_user },
            (err, data) => {
                if (err) {
                    mysql.query('SELECT * FROM `avatars`', (err, avatars) => {
                        res.locals.flash = {}
                        res.locals.flash['error'] = data
                        return res.render('user/update', {
                            ...data,
                            ...req.body,
                            avatars,
                        })
                    })
                } else {
                    req.flash('success', 'Votre compte a bien été modifié.')
                    return res.redirect('/jeu')
                }
            }
        )
    } else {
        req.flash('error', "Vous n'êtes pas connecté.")
        res.redirect('/connexion')
    }
})

router.delete('/mon-compte', (req, res) => {
    if (req.session.id_user !== undefined) { // Si un utilisateur est connecté
        User.remove(req.session.id_user, (err, images) => {
            if (err) {
                req.flash('error', 'Le compte n\'existe pas.')
            } else {
                // Supprimer les images des quizz associés
                if (images) {
                    images.split(',').forEach(img => {
                        fs.unlink('./public/assets/img/quizz/' + img, err => {
                            if (err) console.log('error :', err)
                        })
                    })
                }
                req.flash('success', 'Compte supprimé')
                req.session.id_user = undefined
                res.clearCookie('token')
            }
            res.redirect('/')
        })
    } else {
        req.flash('error', 'Vous n\'êtes pas connecté.')  
        res.redirect('/connexion')
    }
})

router.get('/statistiques', (req, res) => {
    if (req.session.id_user !== undefined) {
        // Si un utilisateur est connecté
        Score.getAllByUser(req.session.id_user, (err, stats) => {
            if (err) return res.json({ error: stats })
            else res.render('user/stats', { stats })
        })
    } else {
        req.flash('error', "Vous n'êtes pas connecté.")
        res.redirect('/connexion')
    }
})

// Si non connecté :
router.get('/inscription', (req, res) => {
    if (req.session.id_user === undefined) {
        // Si aucun utilisateur est connecté
        mysql.query('SELECT * FROM `avatars`', (err, avatars) => {
            res.render('user/inscription', { avatars })
        })
    } else {
        req.flash('error', 'Vous êtes déjà inscrit.')
        res.redirect('/jeu')
    }
})

router.post('/inscription', (req, res) => {
    if (req.session.id_user === undefined) {
        // Si aucun utilisateur est connecté
        User.create({ ...req.body }, (err, data) => {
            if (!err) {
                req.flash('success', 'Bienvenu !')
                req.session.id_user = data // on connecte l'utilisateur
                const token = jwt.sign({
                        name: req.body.user_name,
                        id: data
                    }, process.env.JWTSECRET
                )
                res.cookie('token', token)
                res.redirect('/jeu')
            } else {
                res.locals.flash = {}
                res.locals.flash['error'] = data
                mysql.query('SELECT * FROM `avatars`', (err, avatars) => {
                    res.render('user/inscription', { ...req.body, avatars })
                })
            }
        })
    } else {
        req.flash('error', 'Vous êtes déjà inscrit.')
        res.redirect('/jeu')
    }
})

router.get('/connexion', (req, res) => {
    if (req.session.id_user === undefined) {
        // Si aucun utilisateur est connecté
        res.render('user/connexion')
    } else {
        req.flash('error', 'Vous êtes déjà connecté.')
        res.redirect('/jeu')
    }
})

router.post('/connexion', (req, res) => {
    if (req.session.id_user === undefined) {
        // Si aucun utilisateur est connecté
        User.check({ ...req.body }, (err, data) => {
            if (!err) {
                req.flash('success', 'Ravi de vous revoir !')
                req.session.id_user = data.id_user // on connecte l'utilisateur

                const token = jwt.sign({
                        name: data.user_name,
                        id: data.id_user
                    }, process.env.JWTSECRET
                )
                res.cookie('token', token)
                res.redirect('/jeu')
            } else {
                res.locals.flash = {}
                res.locals.flash['error'] = data
                res.render('user/connexion', { ...req.body })
            }
        })
    } else {
        req.flash('error', 'Vous êtes déjà connecté.')
        res.redirect('/jeu')
    }
})

module.exports = router
