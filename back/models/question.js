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
    update: ({question, id_question}, next) => {
        mysql.execute(
            'UPDATE questions SET question = ? WHERE id_question = ?',
            [question, id_question],
            (err, rows) => {
                if (err) return next(true, err)
                else return Question.get(id_question, next)
            }
        )
    },
    remove: (id_question, next) => {
        mysql.execute('DELETE FROM questions WHERE id_question = ?', [id_question], (err, rows) => {
            if (err) return next(true, err)
            else return next(false, 'Question supprimée')
        })
    },
    create: ({id_quizz, question}, next) => {
        mysql.execute('INSERT INTO questions SET id_quizz = ?, question = ?', [id_quizz, question], (err, rows) => {
            if (err) return next(true, err)
            else return next(false, rows.insertId)
        })
    }
}

module.exports = Question