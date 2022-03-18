const mysql = require('./mysql')

const Quizz = {
    getCategories: (action) => {
        mysql.query('SELECT * FROM categories', (err, rows) => {
            if (err) return action(true, err)
            return action(false, rows)
        })
    },
    getQuizzByCategory: (id, action) => {
        mysql.execute(
            'SELECT * FROM quizz q ' +
            'RIGHT JOIN categories c ' +
            'ON c.id_categorie = q.id_categorie ' +
            'WHERE c.id_categorie = ?',
            [id],
            (err, rows) => {
            if (err) return action(true, err)
            return action(false, rows)
        })
    },
    get: (id, action) => {
        mysql.execute('SELECT * FROM quizz WHERE id_quizz = ?', [id], (err, rows) => {
            if (err) return action(true, err)
            return action(false, rows)
        })
    }
}

module.exports = Quizz