const router = require('express').Router()
const User = require('../models/user')
const mysql = require('../models/mysql')
const Score = require('../models/score')

router.get('/deconnexion', (req, res) => {
    req.session.id_user = undefined
    // flash : à bientôt
    res.redirect('/connexion')
})

// Si connecté :
router.get('/mon-compte', (req, res) => {
    if (req.session.id_user !== undefined) { // Si un utilisateur est connecté
        User.get(req.session.id_user, (err, data) => {
            if (!err) {
                // console.log(data);
                mysql.query(
                    "SELECT * FROM `avatars`",
                    (err, avatars) => {
                      console.log(data);
                      console.log(err);
                      return res.render('user/update', { ...data, avatars })
                    }
                  );
                
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
    if (req.session.id_user !== undefined) { // Si un utilisateur est connecté
        User.update({...req.body, id_user: req.session.id_user}, (err, data) => {
            if (err) {
                console.log('error :', data)
                // flash: error
                return res.render('user/update', { ... req.body })
            } else {
                // flash: succès
                console.log(data)
                return res.redirect('/jeu')
            }
        })
    } else {
        // flash : vous n'êtes pas connecté
        res.redirect('/connexion')
    }
})

router.get('/statistiques', (req, res) => {
    if (req.session.id_user !== undefined) { // Si un utilisateur est connecté
        Score.getAllByUser(req.session.id_user, (err, stats) => {
			if (err) return res.json(stats)
            else res.render('user/stats', { stats })
        })
    }
})

// Si non connecté :
router.get('/inscription', (req, res) => {
    if (req.session.id_user === undefined) { // Si aucun utilisateur est connecté
        mysql.query(
            "SELECT * FROM `avatars`",
            (err, data) => {
              console.log(data);
              console.log(err);
              res.render('user/inscription', {avatars:data})
            }
          );
        
    } else {
        // flash : vous êtes déjà connecté
        res.redirect('/jeu')
    }
})

router.post('/inscription', (req, res) => {
    if (req.session.id_user === undefined) { // Si aucun utilisateur est connecté
        User.create({...req.body}, (err, data) => {
            if (!err) {
                // message succes flash
                req.session.id_user = data // on connecte l'utilisateur
                res.redirect('/jeu')
            } else {
                console.log(data)
                // message erreur flash
                res.render('user/inscription', {...req.body})
            }
        })
    }
})

router.get('/connexion', (req, res) => {
    if (req.session.id_user === undefined) { // Si aucun utilisateur est connecté
        res.render('user/connexion')
    } else {
        // flash : vous êtes déjà connecté
        res.redirect('/jeu')
    }
})

router.post('/connexion', (req, res) => {
    if (req.session.id_user === undefined) { // Si aucun utilisateur est connecté
        User.check({...req.body}, (err, data) => {
            if (!err) {
                // message succes flash               
                req.session.id_user = data // on connecte l'utilisateur
                res.redirect('/jeu')
            } else {
                console.log(data)
                // message erreur flash
                res.render('user/connexion', {...req.body})
            }
        })
    }
})

module.exports = router