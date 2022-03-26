const router = require("express").Router();
const mysql = require("../models/mysql.js");
const Question = require("../models/question.js");
const Reponse = require("../models/reponse.js");

// Récupérer les questions par quizz
router.get("/questions/:id_quizz", (req, res) => {
  mysql.execute(
    "SELECT * FROM `questions` WHERE `id_quizz` = ?",
    [req.params.id_quizz],
    (err, data) => {
      console.log(data);
      console.log(err);
      res.json(data);
    }
  );
});

// Récupérer les réponses par question
router.get("/reponses/:id_question", (req, res) => {
  mysql.execute(
    "SELECT * FROM `reponses` WHERE `id_question` = ?",
    [req.params.id_question],
    (err, data) => {
      console.log(data);
      console.log(err);
      res.json(data);
    }
  );
});

// Enregistrer le score d'un joueur
router.post("/score", (req, res) => {
  mysql.execute(
    "INSERT INTO `scores`(`score`, `date`, `id_user`, `id_quizz`) VALUES (?, now(), ?, ?)",
    [req.body.score, req.body.id_user, req.body.id_quizz],
    (err, data) => {
      console.log(data);
      console.log(err);
      res.json(data);
    }
  );
});

// Récupérer les avatars
router.get("/avatars/", (req, res) => {
  mysql.query(
    "SELECT * FROM `avatars`",
    (err, data) => {
      console.log(data);
      console.log(err);
      res.json(data);
    }
  );
});

// Récupérer les questions et réponses par quizz (doublon avec les deux premières urls : à optimiser)
router.get('/quizz/:id_quizz', (req, res) => {
  // to-do : vérifier les droits (id_user)
    Question.getByQuizz(req.params.id_quizz, (err, data) => {
    return res.json({err, data})
  })
})

// Modifier les questions réponses d'un quizz
router.post('/quizz/:id_quizz', (req, res) => {
    // to-do : vérifier les droits (id_user)
    Question.updateAll({questions: req.body, id_quizz: req.params.id_quizz}, (err, data) => {
        return res.json({err, data})
    })
})

module.exports = router;
