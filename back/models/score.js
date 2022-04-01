const mysql = require("./mysql");

const Score = {
  get: ({ id_quizz, id_user }, action) => {
    mysql.execute(
      "SELECT s.id_quizz, s.score, s.id_user, u.user_name, u.id_avatar, a.filename FROM scores s " +
        "INNER JOIN utilisateurs u ON s.id_user = u.id_user " +
        "INNER JOIN avatars a ON u.id_avatar = a.id_avatar " +
        "WHERE s.id_quizz = ? ORDER BY score DESC LIMIT 3",
      [id_quizz],
      (err, rows) => {
        if (err) return action(true, err);
        let top3 = false;
        rows.forEach((row) => {
          if (row.id_user === id_user) {
            top3 = true;
          }
        });
        if (!top3 && id_user !== undefined) {
          mysql.execute(
            "SELECT s.id_quizz, s.score, s.id_user, u.user_name, u.id_avatar, a.filename FROM scores s " +
              "INNER JOIN utilisateurs u ON s.id_user = u.id_user " +
              "INNER JOIN avatars a ON u.id_avatar = a.id_avatar " +
              "WHERE s.id_quizz = ? AND s.id_user = ?",
            [id_quizz, id_user],
            (err, scores) => {
              if (err) return action(true, err);
              rows.push(scores[0]);
              return action(false, rows);
            }
          );
        } else {
          return action(false, rows);
        }
      }
    );
  },
  create: ({ score, id_user, id_quizz }, action) => {
    mysql.execute(
      "SELECT score FROM scores WHERE id_user = ? AND id_quizz = ?",
      [id_user, id_quizz],
      (err, rows) => {
        if (rows.length === 0) {
          mysql.execute(
            "INSERT INTO `scores`(`score`, `date`, `id_user`, `id_quizz`) VALUES (?, now(), ?, ?)",
            [req.body.score, req.body.id_user, req.body.id_quizz],
            (err, data) => {
              if (err) return action(true, err);
              return action(false, "score enregistré");
            }
          );
        } else if (rows[0].score <= score) {
          mysql.execute(
            "UPDATE scores SET score = ?, date = now() WHERE id_user = ? AND id_quizz = ?",
            [score, id_user, id_quizz],
            (err, rows) => {
              if (err) return action(true, err);
              return action(false, "score mis à jour");
            }
          );
        } else {
          return action(false, "score non mis à jour car inférieur");
        }
      }
    );
  },
};

module.exports = Score;
