const router = require('express').Router()
const Classement = require('../models/classement')


router.get("/:id_quizz", (req, res) => {
    Classement.get(req.params.id_quizz, (err, quizz) => {
        res.render("classement")
    })
     
 })



module.exports = router