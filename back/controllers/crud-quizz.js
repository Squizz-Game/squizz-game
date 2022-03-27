const router = require('express').Router()
const formidable = require('formidable')
const fs = require('fs')
const Quizz = require('../models/quizz')

router.get('/nouveau', (req, res) => {
    req.session.user_id = 2 // à supprimer
    if (req.session.user_id !== undefined) { // Si un utilisateur est connecté
        Quizz.getCategories((err, data) => {
            if (err) throw err

            res.render('nouveau-quizz', {categories: data})
        })
    } else {
        // flash : vous n'êtes pas connecté
        res.redirect('/connexion')
    }
})

router.post('/nouveau', async (req, res) => {
    req.session.user_id = 2 // à supprimer
    if (req.session.user_id !== undefined) { // Si un utilisateur est connecté
        // Gérer l'upload d'image
        const form = formidable({ multiples: false })

        form.parse(req, (err, fields, file) => {
            // Vérifier s'il y a une erreur ou si le format de l'image est incorrect
            if (err || file.image?.mimetype !== ('image/png' || 'image/jpeg')) {
                // flash : err
                Quizz.getCategories((err, data) => {
                    if (err) throw err
                    res.render('nouveau-quizz', { ...fields, categories: data })
                })
            } else {
                const filename = file.image.originalFilename
                const ext = filename.substr(filename.lastIndexOf('.'), filename.length)
                const newFilename = file.image.newFilename + ext
                const newpath = './public/assets/img/quizz/' + newFilename
    
                // Uploader l'image avec fs
                fs.rename(file.image.filepath, newpath, err => {
                    if (err) return console.log(err)
                    console.log('Image uploadé !')
                    
                    // Enregistrer le quizz en bdd
                    Quizz.create({
                        ...fields,
                        image: newFilename,
                        id_user: req.session.user_id
                    }, (err, data) => {
                        if (err) {
                            // flash: error
                            console.log(data)
                            Quizz.getCategories((err, data) => {
                                if (err) throw err
                                res.render('nouveau-quizz', { ...fields, categories: data })
                            })
                        } else {
                            console.log('quizz uploadé !')
                            res.redirect('/mes-quizz/' + data + '/1') // to-do : redirect to create question
                        }
                    })
                })
            }
        })
    } else {
        // flash : vous n'êtes pas connecté
        res.redirect('/connexion')
    }
})

module.exports = router