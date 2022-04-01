const router = require("express").Router();
const Score = require("../models/score");
const Quizz = require("../models/quizz");

router.get("/:id_quizz", (req, res) => {
  Score.getAll(req.params.id_quizz, (err, scores) => {
    if (err) {
      console.log(scores);
    } else {
      Quizz.get(req.params.id_quizz, (err, quizz) => {
        res.render("jeu/classement", {
          scores,
          quizz,
        });
      });
    }
  });
});

module.exports = router;
