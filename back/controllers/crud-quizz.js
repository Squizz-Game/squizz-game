const router = require('express').Router()
const formidable = require('formidable')
const fs = require('fs')
const Quizz = require('../models/quizz')

// Lister ses quizz
router.get('/', (req, res) => {    
    if (req.session.id_user !== undefined) { // Si un utilisateur est connecté
        Quizz.getByUser(req.session.id_user, (err, data) => {
            if (err) throw err
            else return res.render('crud/index', {myQuizz: data})
        })
    } else {
        req.flash('error', 'Vous n\'êtes pas connecté.')  
        res.redirect('/connexion')
    }
})

// Créer un nouveau quizz
router.get('/nouveau', (req, res) => {
    if (req.session.id_user !== undefined) { // Si un utilisateur est connecté
        Quizz.getCategories((err, data) => {
            if (err) throw err

            res.render('crud/create', {categories: data})
        })
    } else {
        req.flash('error', 'Vous n\'êtes pas connecté.')  
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
                res.locals.flash = {}
                res.locals.flash['error'] = err ?? 'Format d\'image incorrect'
                Quizz.getCategories((err, data) => {
                    if (err) throw err
                    res.render('crud/create', { ...fields, categories: data })
                })
            } else {
                const filename = file.image.originalFilename
                const ext = filename.substr(filename.lastIndexOf('.'), filename.length)
                const newFilename = file.image.newFilename + ext
                const newpath = './public/assets/img/quizz/' + newFilename
    
                // Uploader l'image avec fs
                fs.rename(file.image.filepath, newpath, err => {
                    if (err) return req.flash('error', data)                 
                    // Enregistrer le quizz en bdd
                    Quizz.create({
                        ...fields,
                        image: newFilename,
                        id_user: req.session.id_user
                    }, (err, data) => {
                        if (err) {
                            res.locals.flash = {}
                            res.locals.flash['error'] = data
                            Quizz.getCategories((err, data) => {
                                if (err) throw err
                                res.render('crud/create', { ...fields, categories: data })
                            })
                        } else {
                            console.log('hello');
                            req.flash('success', 'Votre quizz a été créé : vous pouvez ajouter des questions !')
                            res.redirect(data + '/questions')
                        }
                    })
                })
            }
        })
    } else {
        req.flash('error', 'Vous n\'êtes pas connecté.')  
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
                    return res.render('crud/create', {...data, categories})
                })
            }
        })
    } else {
        req.flash('error', 'Vous n\'êtes pas connecté.')  
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
                    req.flash('success', 'Quizz modifié.')
                    res.redirect('./' + req.params.id_quizz + '/questions')
                })
            // Si une image est uploadé et qu'il y a une erreur
            } else if (err || (file.image?.mimetype !== 'image/png' && file.image?.mimetype !== 'image/jpeg')) {
                res.locals.flash = {}
                res.locals.flash['error'] = err ?? 'Format d\'image incorrect'
                Quizz.getCategories((err, categories) => {
                    if (err) throw err
                    Quizz.getForAdmin(req.params.id_quizz, (err, data) => {
                        if (err) throw err
                        res.render('crud/create', { ...data, ...fields, categories })
                    })
                })
            // Si une image est uploadé sans erreur
            } else {
                Quizz.getForAdmin(req.params.id_quizz, (err, data) => {
                    if (err) throw err

                    // Supprimer l'ancienne image
                    fs.unlink('./public/assets/img/quizz/' + data.image, err => {
                        if (err) req.flash('error', err)

                        const filename = file.image.originalFilename
                        const ext = filename.substr(filename.lastIndexOf('.'), filename.length)
                        const newFilename = file.image.newFilename + ext
                        const newpath = './public/assets/img/quizz/' + newFilename

                        // Uploader la nouvelle image avec fs
                        fs.rename(file.image.filepath, newpath, err => {
                            if (err) throw err

                            Quizz.update({...fields, ...req.params, image: newFilename}, (err, data) => {
                                req.flash('success', 'Quizz modifié')
                                res.redirect(req.originalUrl + '/questions')
                            })
                        })
                    })
                })
            }
        })
    } else {
        req.flash('error', 'Vous n\'êtes pas connecté.')  
        res.redirect('/connexion')
    }
})

// Gérer les questions
router.get('/:id_quizz/questions', (req, res) => {
    if (req.session.id_user !== undefined) { // Si un utilisateur est connecté
        Quizz.getForAdmin(req.params.id_quizz, (err, data) => {
            if (err) {
                req.flash('error', 'Ce quizz n\'existe pas.')
                res.redirect('/mes-quizz')
            } else if (data.id_user === req.session.id_user) {
                res.render('crud/update', { quizz: data })
            } else {
                req.flash('error', 'Vous n\'avez pas les droits pour modifier ce quizz.')
                res.redirect('/mes-quizz')
            }
        })
    } else {
        req.flash('error', 'Vous n\'êtes pas connecté.')  
        res.redirect('/connexion')
    }
})

//Supprimer un quizz
router.delete('/:id_quizz', (req, res) => {
    // to-do : add JWT verification
    if (req.session.id_user !== undefined) { // Si un utilisateur est connecté
        Quizz.remove({ id_quizz: req.params.id_quizz, id_user: req.session.id_user }, (err, data) => {
            if (err) {
                req.flash('error', 'Ce quizz n\'existe pas.')
            } else {
                req.flash('success', 'Quizz supprimé')
            }
            res.redirect('/mes-quizz')
        })
    } else {
        req.flash('error', 'Vous n\'êtes pas connecté.')  
        res.redirect('/connexion')
    }
})

module.exports = router