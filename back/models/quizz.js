const mysql = require('./mysql')

const Quizz = {
    getCategories: (action) => {
        mysql.query('SELECT * FROM categories', (err, rows) => {
            if (err) return action(true, err)
            return action(false, rows)
        })
    },
    getByCategory: (id, action) => {
        mysql.execute(
            'SELECT *, q.image as q_img FROM quizz q ' +
            'RIGHT JOIN categories c ' +
            'ON c.id_categorie = q.id_categorie ' +
            'LEFT JOIN utilisateurs u ' +
            'ON u.id_user = q.id_user ' +
            'WHERE c.id_categorie = ?',
            [id],
            (err, rows) => {
            if (err) return action(true, err)
            return action(false, rows)
        })
    },
    getByUser: (id, action) => {
        mysql.execute(
            'SELECT * FROM quizz ' +
            'WHERE id_user = ?',
            [id],
            (err, rows) => {
            if (err) return action(true, err)
            return action(false, rows)
        })
    },
    get: (id, action) => {
        mysql.execute('SELECT * FROM quizz WHERE id_quizz = ?', [id], (err, rows) => {
            if (err) return action(true, err)
            return action(false, rows[0])
        })
    },
    create: ({nom_quizz, image, id_categorie, id_user}, action) => {
        if (
            nom_quizz === (undefined || '') ||
            image === (undefined || '') ||
            id_categorie === (undefined || '') ||
            id_user === (undefined || '')
        ) return action(true, 'Veuillez renseigner tous les champs.')

        mysql.execute(
            'INSERT INTO quizz SET nom_quizz = ?, image = ?, id_categorie = ?, id_user = ?',
            [nom_quizz, image, id_categorie, id_user],
            (err, rows) => {
                if (err) return action(true, err)
                return action(false, rows.insertId)
            }
        )
    },
    update: ({nom_quizz, image, id_categorie, id_quizz}, next) => {
        if (
            nom_quizz === (undefined || '') ||
            id_categorie === (undefined || '') ||
            id_quizz === (undefined || '')
        ) return action(true, 'Veuillez renseigner tous les champs.')
        
        if (image === undefined) {
            mysql.execute(
                'UPDATE quizz SET nom_quizz = ?, id_categorie = ? WHERE id_quizz = ?',
                [nom_quizz, id_categorie, id_quizz],
                (err, rows) => {
                    if (err) return next(true, err)
                    else return next(false, err)
                }
            )
        } else {
            mysql.execute(
                'UPDATE quizz SET nom_quizz = ?, id_categorie = ?, image = ? WHERE id_quizz = ?',
                [nom_quizz, id_categorie, image, id_quizz],
                (err, rows) => {
                    if (err) return next(true, err)
                    else return next(false, err)
                }
            )
        }
    },
    remove: (id_quizz, next) => {
        mysql.execute('DELETE FROM quizz WHERE id_quizz = ?', [id_quizz], (err, rows) => {
            if (err) return next(true, err)
            return next(false, rows)
        })
    }
}

module.exports = Quizz