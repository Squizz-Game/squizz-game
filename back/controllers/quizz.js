const router = require('express').Router()
const Quizz = require('../models/quizz')

router.get('/', (req, res) => {
    Quizz.getCategories((err, data) => {
        if (!err) {
            res.render('categories', { categories: data })
        }
    })
})

router.get('/:id_cat', (req, res) => {
    Quizz.getQuizzByCategory(req.params.id_cat, (err, data) => {
        if (!err) {
            res.render('category', { quizz: data, category: data[0].nom_categorie })
        }
        else res.send('error')
    })
})

router.get('/:id_cat/:id_quizz', (req, res) => {
    Quizz.get(req.params.id_quizz, (err, data) => {
        if (!err) {
            const quizz = data[0]
            // Si aucun quizz, rediriger sur la page catégorie
            if (!quizz) return res.redirect('/quizz/' + req.params.id_cat)
            // Si l'id de la catégorie n'est pas le bon, rediriger sur la bonne url
            if (quizz && parseInt(quizz.id_categorie) !== parseInt(req.params.id_cat))
                return res.redirect('/quizz/' + quizz.id_categorie + '/' + quizz.id_quizz)
            res.render('quizz', { quizz })
        }
        else res.send('error')
    })
})

module.exports = router