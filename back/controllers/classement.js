const router = require('express').Router()
const Score = require('../models/score')


router.get("/:id_quizz", (req, res) => {
    Score.getAll(req.params.id_quizz, (err, scores) => {
        if (err) {
            console.log(scores);
        } else {
            res.render("classement", {scores})
        }
        
    })
     
 })



module.exports = router