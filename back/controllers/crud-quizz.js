const router = require('express').Router()
const formidable = require('formidable')
const fs = require('fs')
const Quizz = require('../models/quizz')

// Lister ses quizz
router.get('/', (req, res) => {    
    if (req.session.id_user !== undefined) { // Si un utilisateur est connecté
        Quizz.getByUser(req.session.id_user, (err, data) => {
            if (err) throw err
            else return res.render('mes-quizz', {myQuizz: data})
        })
    } else {
        res.redirect('/connexion')
    }
})

// Créer un nouveau quizz
router.get('/nouveau', (req, res) => {
    if (req.session.id_user !== undefined) { // Si un utilisateur est connecté
        Quizz.getCategories((err, data) => {
            if (err) throw err

            res.render('mon-quizz', {categories: data})
        })
    } else {
        // flash : vous n'êtes pas connecté
        res.redirect('/connexion')
    }
})

router.post('/nouveau', (req, res) => {
    if (req.session.id_user !== undefined) { // Si un utilisateur est connecté
        // Gérer l'upload d'image
        const form = formidable({ multiples: false })

        form.parse(req, (err, fields, file) => {
            // Vérifier s'il y a une erreur ou si le format de l'image est incorrect
            if (err || (file.image?.mimetype !== 'image/png' && file.image?.mimetype !== 'image/jpeg')) {
                // flash : err
                Quizz.getCategories((err, data) => {
                    if (err) throw err
                    res.render('mon-quizz', { ...fields, categories: data })
                })
            } else {
                const filename = file.image.originalFilename
                const ext = filename.substr(filename.lastIndexOf('.'), filename.length)
                const newFilename = file.image.newFilename + ext
                const newpath = './public/assets/img/quizz/' + newFilename
    
                // Uploader l'image avec fs
                fs.rename(file.image.filepath, newpath, err => {
                    if (err) return console.log(err)                    
                    // Enregistrer le quizz en bdd
                    Quizz.create({
                        ...fields,
                        image: newFilename,
                        id_user: req.session.id_user
                    }, (err, data) => {
                        if (err) {
                            // flash: error
                            Quizz.getCategories((err, data) => {
                                if (err) throw err
                                res.render('mon-quizz', { ...fields, categories: data })
                            })
                        } else {
                            res.redirect(data + '/questions')
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

// Modifier un quizz
router.get('/:id_quizz', (req, res) => {
    if (req.session.id_user !== undefined) { // Si un utilisateur est connecté
        Quizz.getForAdmin(req.params.id_quizz, (err, data) => {
            if (err) throw err
            else {
                Quizz.getCategories((err, categories) => {
                    if (err) throw err
                    return res.render('mon-quizz', {...data, categories})
                })
            }
        })
    } else {
        res.redirect('/connexion')
    }
})

router.post('/:id_quizz', (req, res) => {
    if (req.session.id_user !== undefined) { // Si un utilisateur est connecté
        const form = formidable({ multiples: false })
        form.parse(req, (err, fields, file) => {
            // Si aucune image est uploadé
            if (file.image?.originalFilename === '') {
                Quizz.update({...fields, ...req.params}, (err, data) => {
                    res.redirect('./' + req.params.id_quizz + '/questions')
                })
            } else if (err || (file.image?.mimetype !== 'image/png' && file.image?.mimetype !== 'image/jpeg')) {
                // flash : error, format image incorrect
                Quizz.getCategories((err, categories) => {
                    console.log('2', err)
                    if (err) throw err
                    Quizz.getForAdmin(req.params.id_quizz, (err, data) => {
                        console.log('3', err)
                        if (err) throw err
                        res.render('mon-quizz', { ...data, ...fields, categories })
                    })
                })
            } else {
                Quizz.getForAdmin(req.params.id_quizz, (err, data) => {
                    if (err) throw err

                    fs.unlink('./public/assets/img/quizz/' + data.image, err => {
                        if (err) console.log(err)

                        const filename = file.image.originalFilename
                        const ext = filename.substr(filename.lastIndexOf('.'), filename.length)
                        const newFilename = file.image.newFilename + ext
                        const newpath = './public/assets/img/quizz/' + newFilename

                        // Uploader l'image avec fs
                        fs.rename(file.image.filepath, newpath, err => {
                            if (err) throw err

                            Quizz.update({...fields, ...req.params, image: newFilename}, (err, data) => {
                                console.log(err, data, req.url)
                                res.redirect(req.originalUrl + '/questions')
                            })
                        })
                    })
                })
            }
        })
    } else {
        res.redirect('/connexion')
    }
})

// Gérer les questions
router.get('/:id_quizz/questions', (req, res) => {
    if (req.session.id_user !== undefined) { // Si un utilisateur est connecté
        Quizz.getForAdmin(req.params.id_quizz, (err, data) => {
            console.log(data);
            if (err) {
                // flash: ce quizz n'existe pas
                res.redirect('/mes-quizz')
            } else if (data.id_user === req.session.id_user) {
                res.render('questions', { quizz: data})
            } else {
                // flash: vous n'avez pas les droits pour modifier ce quizz
                res.redirect('/mes-quizz')
            }
        })
    } else {
        res.redirect('/connexion')
    }
})

//Supprimer un quizz
router.delete('/:id_quizz', (req, res) => {
    // to-do : add JWT verification
    if (req.session.id_user !== undefined) { // Si un utilisateur est connecté
        Quizz.remove(req.params.id_quizz, (err, data) => {
            if (err) {
                // flash: ce quizz n'existe pas
            } else if (data.id_user !== req.session.id_user) {
                // flash: vous n'avez pas les droits pour supprimer ce quizz
            }
            res.redirect('/mes-quizz')
        })
    } else {
        res.redirect('/connexion')
    }
})

module.exports = router