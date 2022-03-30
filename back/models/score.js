const mysql = require('./mysql')
const moment = require('./moment')

const Score = {
    get: ({ id_quizz, id_user }, action) => {
        mysql.execute(
            'SELECT s.id_quizz, s.score, s.id_user, q.nom_quizz, u.user_name, u.id_avatar, a.filename FROM scores s ' +
                'INNER JOIN quizz q ON s.id_quizz = q.id_quizz ' +
                'INNER JOIN utilisateurs u ON s.id_user = u.id_user ' +
                'INNER JOIN avatars a ON u.id_avatar = a.id_avatar ' +
                'WHERE s.id_quizz = ? ORDER BY score DESC LIMIT 3',
            [id_quizz],
            (err, rows) => {
                if (err) return action(true, err)
                let top3 = false
                // rows.forEach((row) => {
                //   if (row.id_user === id_user) {
                //     top3 = true;
                //   }
                // });
                if (/*!top3 && */ id_user !== undefined) {
                    mysql.execute(
                        'SELECT s.id_quizz, s.score, s.id_user, u.user_name, u.id_avatar, a.filename FROM scores s ' +
                            'INNER JOIN utilisateurs u ON s.id_user = u.id_user ' +
                            'INNER JOIN avatars a ON u.id_avatar = a.id_avatar ' +
                            'WHERE s.id_quizz = ? AND s.id_user = ?',
                        [id_quizz, id_user],
                        (err, scores) => {
                            if (err) return action(true, err)
                            rows.push(scores[0])
                            return action(false, rows)
                        }
                    )
                } else {
                    return action(false, rows)
                }
            }
        )
    },
    create: ({ score, id_user, id_quizz }, action) => {
        mysql.execute(
            'SELECT score FROM scores WHERE id_user = ? AND id_quizz = ?',
            [id_user, id_quizz],
            (err, rows) => {
                if (rows.length === 0) {
                    mysql.execute(
                        'INSERT INTO `scores`(`score`, `date`, `id_user`, `id_quizz`) VALUES (?, now(), ?, ?)',
                        [score, id_user, id_quizz],
                        (err, data) => {
                            if (err) return action(true, err)
                            return action(false, 'score enregistré')
                        }
                    )
                } else if (rows[0].score <= score) {
                    mysql.execute(
                        'UPDATE scores SET score = ?, date = now() WHERE id_user = ? AND id_quizz = ?',
                        [score, id_user, id_quizz],
                        (err, rows) => {
                            if (err) return action(true, err)
                            return action(false, 'score mis à jour')
                        }
                    )
                } else {
                    return action(false, 'score non mis à jour car inférieur')
                }
            }
        )
    },
    getAll: (id_quizz, action) => {
        mysql.execute(
            'SELECT s.id_quizz, s.score, s.id_user, q.nom_quizz, u.user_name, u.id_avatar, a.filename FROM scores s ' +
                'INNER JOIN quizz q ON s.id_quizz = q.id_quizz ' +
                'INNER JOIN utilisateurs u ON s.id_user = u.id_user ' +
                'INNER JOIN avatars a ON u.id_avatar = a.id_avatar ' +
                'WHERE s.id_quizz = ? ORDER BY score DESC',
            [id_quizz],
            (err, rows) => {
                if (err) return action(true, err)
                return action(false, rows)
            }
        )
    },
    getAllByUser: (id_user, action) => {
        // récupérer le score, la date et le rang du joueur pour chaque quizz
        mysql.execute(
            'SELECT s.score, s.date, s.id_quizz, q.nom_quizz, q.id_categorie, q.image FROM scores s ' +
            'LEFT JOIN quizz q ON q.id_quizz = s.id_quizz ' +
                'WHERE s.id_user = ?',
            [id_user],
            async (err, rows) => {
                if (err) return action(true, err)
                else {
                    rows.forEach(async (row, i) => {
                        rows[i].date = moment(rows[i].date).format('DD/MM/YYYY')
                        const [ranks] = await mysql
                            .promise()
                            .execute(
                                'SELECT id_score, id_quizz, id_user, score, ' +
                                    '(RANK() OVER(ORDER BY score DESC)) rnk ' +
                                    'FROM scores ' +
                                    'WHERE id_quizz = ?',
                                [row.id_quizz]
                            )

                            ranks.forEach(rank => {
                                if (rank.id_user === id_user) return rows[i].rank = rank.rnk
                            })

                            if (i === rows.length - 1) {
                                return action(false, rows)
                            }
                    })
                }
            }
        )
    },
}

module.exports = Score
