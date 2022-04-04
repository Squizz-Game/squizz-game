const router = require("express").Router();
const Score = require("../models/score");
const Quizz = require("../models/quizz");

router.get("/:id_quizz", (req, res) => {
  Score.getAll(req.params.id_quizz, (err, scores) => {
    if (err) {
      console.log(err, scores);
      req.flash('error', 'Une erreur s\est produite.')
      res.redirect('/jeu')
    } else {
      Quizz.get(req.params.id_quizz, (err, quizz) => {
        if (quizz) {
          res.render("jeu/classement", {
            scores,
            quizz,
          })
        } else {
          req.flash('error', 'Ce classement n\'existe pas.')
          res.redirect('/jeu')
        }
      });
    }
  });
});

module.exports = router;
