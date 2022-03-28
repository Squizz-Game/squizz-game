const mysql = require('./mysql')

const Question = {
    get: (id_question, next) => {
        mysql.execute(
            'SELECT * FROM questions WHERE id_question = ?',
                [id_question],
                (err, rows) => {
                    if (err) return next(true, err)
                    else return next(false, rows[0])
                }
            )
    },
    getByQuizz: async (id_quizz, next) => {
        // let questions = []
        const [questions] = await mysql.promise().execute('SELECT * FROM questions WHERE id_quizz = ?', [id_quizz])
        for (i in questions) {
            [questions[i].reponses] = await mysql.promise().execute('SELECT * FROM reponses WHERE id_question = ?', [questions[i].id_question])
        }

        return next(false, questions)
    },
    updateAll: async ({questions, id_quizz}, next) => {
        if (questions.length > 9) {
            const ids_questions = [] // pour vérifier si des questions ont été supprimées
            for (const q of questions) {
                if (q.id_question) { // Si la question existe déjà en bdd, on la modifie
                    ids_questions.push(q.id_question)
                    await mysql.promise().execute(
                        'UPDATE questions SET question = ? WHERE id_question = ? AND id_quizz = ?',
                        [q.question, q.id_question, id_quizz]
                    )

                    // update les réponses
                    const ids_reponses = [] // pour vérifier si des réponses ont été supprimées
                    for (const r of q.reponses) {
                        if (r.id_reponse && r.reponse !== '') { // Si la réponse existe déjà en bdd, on la modifie
                            ids_reponses.push(r.id_reponse)
                            await mysql.promise().execute(
                                'UPDATE reponses SET reponse = ?, correct = ? WHERE id_reponse = ? AND id_question = ?',
                                [r.reponse, r.correct, r.id_reponse, q.id_question]
                            )
                        } else if (r.reponse !== '') { // Si la réponse n'existe pas en bdd, on la crée
                            const [rows] = await mysql.promise().execute(
                                'INSERT INTO reponses SET reponse = ?, correct = ?, id_question = ?',
                                [r.reponse, r.correct, q.id_question]
                            )
                            ids_reponses.push(rows.insertId)
                        }

                    }
                    await mysql.promise().execute(
                        'DELETE FROM reponses WHERE id_question = ? AND id_reponse NOT IN (' + ids_reponses.join() + ')',
                        [q.id_question]
                    )
                } else { // Si la question n'existe pas en bdd, on la crée
                    const [rows] = await mysql.promise().execute(
                        'INSERT INTO questions SET question = ?, id_quizz = ?',
                        [q.question, id_quizz]
                    )
                    const id_question = rows.insertId
                    ids_questions.push(id_question)

                    // créer les réponses
                    for (const r of q.reponses) {
                        const [rows] = await mysql.promise().execute(
                            'INSERT INTO reponses SET reponse = ?, correct = ?, id_question = ?',
                            [r.reponse, r.correct, id_question]
                        )
                    }
                }
            }

            mysql.execute(
                'DELETE FROM questions WHERE id_quizz = ? AND id_question NOT IN (' + ids_questions.join() + ')',
                [id_quizz],
                (err, rows) => {
                    if (err) throw err

                    Question.getByQuizz(id_quizz, next)
                }
            )
        } else {
            next(true, 'Vous devez renseignez au moins 10 questions.')
        }
    }
}

module.exports = Question