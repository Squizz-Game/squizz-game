const router = require("express").Router();
const mysql = require("../models/mysql.js");
const Question = require("../models/question.js");
const Reponse = require("../models/reponse.js");

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

router.get('/quizz/:id_quizz', (req, res) => {
  Question.getByQuizz(req.params.id_quizz, (err, data) => {
    return res.json({err, data})
  })
})

// Modifier une question
router.post('/update/question', (req, res) => {
    Question.update({...req.body}, (err, data) => {
        if (err) throw err
        else return res.json(data)
    })
})

// Supprimer une question
router.delete('/remove/question', (req, res) => {
    Question.remove(req.body.id_question, (err, data) => {
        res.json({err, data})
    })
})

// Supprimer une question
router.post('/create/question', (req, res) => {
    Question.create({...req.body}, (err, data) => {
        res.json({err, data})
    })
})

// Modifier une réponse
router.post('/update/reponse', (req, res) => {
    console.log('req', req.body)
    Reponse.update({...req.body}, (err, data) => {
        res.json({err, data})
    })
})

module.exports = router;
