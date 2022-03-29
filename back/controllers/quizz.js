const router = require('express').Router()
const { send } = require('express/lib/response')
const mysql = require('../models/mysql')
const Quizz = require('../models/quizz')
const Score = require('../models/score')

router.get('/', (req, res) => {
    Quizz.getCategories((err, data) => {
        if (!err) {
            res.render('categories', { categories: data })
        }
    })
})

router.get('/:id_cat', (req, res) => {
    Quizz.getByCategory(req.params.id_cat, (err, data) => {
        if (!err) {
            mysql.execute(
                'SELECT nom_categorie FROM categories WHERE id_categorie = ?',
                [req.params.id_cat],
                (err, rows) => {
                    console.log(err);
                    if (err) return res.send('error')
                    return res.render('category', { cat: data, category: rows[0].nom_categorie })
                }
            )
        }
        else {
            console.log(data)
            res.send('error')
        }
    })
})

router.get('/:id_cat/:id_quizz', (req, res) => {
    Quizz.get(req.params.id_quizz, (err, quizz) => {
        if (!err) {
            // Si aucun quizz, rediriger sur la page catégorie
            if (!quizz) return res.redirect('/jeu/' + req.params.id_cat)
            // Si l'id de la catégorie n'est pas le bon, rediriger sur la bonne url
            if (quizz && parseInt(quizz.id_categorie) !== parseInt(req.params.id_cat))
                return res.redirect('/jeu/' + quizz.id_categorie + '/' + quizz.id_quizz)
            res.render('quizz', { quizz })
        }
        else {
            res.send('error')
        }
    })
})

router.get('/:id_cat/:id_quizz/end-game', (req, res) => {
    
    Score.get({
        id_quizz: req.params.id_quizz,
        id_user: req.session.id_user
    }, (err, data) => {
        res.render('quizz-end-game', {
            scores: data,
            score: req.query.score
        })
    })
    
})


module.exports = router