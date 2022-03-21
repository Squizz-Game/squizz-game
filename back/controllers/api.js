const router = require("express").Router();
const mysql = require("../models/mysql.js");

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
    "INSERT INTO `scores`(`score`, `date`, `id_user`, `id_quizz`) VALUES ([req.body], [now()], [id_user], [id_quizz]) "
  )
  console.log("salut", req.body);
  res.send("coucou")
})

module.exports = router;
