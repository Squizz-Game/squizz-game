const router = require('express').Router()
const User = require('../models/user')
const mysql = require('../models/mysql')
const Score = require('../models/score')

router.get('/deconnexion', (req, res) => {
    req.session.id_user = undefined
    req.flash('success', 'À bientôt !')     
    res.redirect('/connexion')
})

// Si connecté :
router.get('/mon-compte', (req, res) => {
    if (req.session.id_user !== undefined) { // Si un utilisateur est connecté
        User.get(req.session.id_user, (err, data) => {
            if (!err) {
                mysql.query(
                    "SELECT * FROM `avatars`",
                    (err, avatars) => {
                      console.log(data);
                      console.log(err);
                      return res.render('user/update', { ...data, avatars })
                    }
                  )
            } else {
                req.flash('error', 'Une erreur s\'est produite.')
                res.redirect('/connexion')
            }
        })
    } else {
        req.flash('error', 'Vous n\'êtes pas connecté.')   
        res.redirect('/connexion')
    }
})

router.post('/mon-compte', (req, res) => {
    if (req.session.id_user !== undefined) { // Si un utilisateur est connecté
        User.update({...req.body, id_user: req.session.id_user}, (err, data) => {
            if (err) {
                mysql.query(
                    "SELECT * FROM `avatars`",
                    (err, avatars) => {
                        res.locals.flash = {}
                        res.locals.flash['error'] = data
                      return res.render('user/update', { ...data, ... req.body, avatars })
                    }
                  )
            } else {
                req.flash('success', 'Votre compte a bien été modifié.')
                return res.redirect('/jeu')
            }
        })
    } else {
        req.flash('error', 'Vous n\'êtes pas connecté.')  
        res.redirect('/connexion')
    }
})

router.get('/statistiques', (req, res) => {
    if (req.session.id_user !== undefined) { // Si un utilisateur est connecté
        Score.getAllByUser(req.session.id_user, (err, stats) => {
			if (err) return res.json({error: stats})
            else res.render('user/stats', { stats })
        })
    } else {
        req.flash('error', 'Vous n\'êtes pas connecté.')  
        res.redirect('/connexion')
    }
})

// Si non connecté :
router.get('/inscription', (req, res) => {
    if (req.session.id_user === undefined) { // Si aucun utilisateur est connecté
        mysql.query(
            "SELECT * FROM `avatars`",
            (err, data) => {
              res.render('user/inscription', {avatars: data})
            }
          );
    } else {
        req.flash('error', 'Vous êtes déjà inscrit.')  
        res.redirect('/jeu')
    }
})

router.post('/inscription', (req, res) => {
    if (req.session.id_user === undefined) { // Si aucun utilisateur est connecté
        User.create({...req.body}, (err, data) => {
            if (!err) {
                req.flash('success', 'Bienvenu !')  
                req.session.id_user = data // on connecte l'utilisateur
                res.redirect('/jeu')
            } else {
                res.locals.flash = {}
                res.locals.flash['error'] = data
                res.render('user/inscription', {...req.body})
            }
        })
    } else {
        req.flash('error', 'Vous êtes déjà inscrit.')  
        res.redirect('/jeu')
    }
})

router.get('/connexion', (req, res) => {
    if (req.session.id_user === undefined) { // Si aucun utilisateur est connecté
        res.render('user/connexion')
    } else {
        req.flash('error', 'Vous êtes déjà connecté.')  
        res.redirect('/jeu')
    }
})

router.post('/connexion', (req, res) => {
    if (req.session.id_user === undefined) { // Si aucun utilisateur est connecté
        User.check({...req.body}, (err, data) => {
            if (!err) {
                req.flash('success', 'Ravi de vous revoir !')         
                req.session.id_user = data // on connecte l'utilisateur
                res.redirect('/jeu')
            } else {
                res.locals.flash = {}
                res.locals.flash['error'] = data
                res.render('user/connexion', {...req.body})
            }
        })
    } else {
        req.flash('error', 'Vous êtes déjà connecté.')  
        res.redirect('/jeu')
    }
})

module.exports = router