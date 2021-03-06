const router = require("express").Router();
const mysql = require("../models/mysql");
const Quizz = require("../models/quizz");
const Score = require("../models/score");

/** Listing des catégories */
router.get("/", (req, res) => {
  Quizz.getCategories((err, data) => {
    if (!err) {
      res.render("jeu/categories", { categories: data });
    }
  });
});

/** Listing des quizz par catégories */
router.get("/:id_cat", (req, res) => {
  Quizz.getByCategory(req.params.id_cat, (err, data) => {
    if (!err) {
      mysql.execute(
        "SELECT nom_categorie FROM categories WHERE id_categorie = ?",
        [req.params.id_cat],
        (err, rows) => {
          console.log(err);
          if (err) return res.send("error");
          return res.render("jeu/category", {
            cat: data,
            category: rows[0].nom_categorie,
          });
        }
      );
    } else {
      console.log(data);
      res.send("error");
    }
  });
});

/** Jeu */
router.get("/:id_cat/:id_quizz", (req, res) => {
  res.cookie('min_questions', process.env.MIN_QUESTIONS)
  Quizz.get(req.params.id_quizz, (err, quizz) => {
    if (!err) {
      // Si aucun quizz, rediriger sur la page catégorie
      if (!quizz) return res.redirect("/jeu/" + req.params.id_cat);
      // Si l'id de la catégorie n'est pas le bon, rediriger sur la bonne url
      if (quizz && parseInt(quizz.id_categorie) !== parseInt(req.params.id_cat))
        return res.redirect(
          "/jeu/" + quizz.id_categorie + "/" + quizz.id_quizz
        );
      res.render("jeu/game", { quizz });
    } else {
      console.log(data);
      res.send("error");
    }
  });
});

/** Fin de jeu */
router.get("/:id_cat/:id_quizz/end-game", (req, res) => {
  Score.get(
    {
      id_quizz: req.params.id_quizz,
      id_user: req.session.id_user,
    },
      (err, scores) => {
      Quizz.get(req.params.id_quizz, (err, quizz) => {
        console.log(scores);
        res.render("jeu/end-game", {
          scores,
          quizz,
        });
      });
    }
  );
});

module.exports = router;
