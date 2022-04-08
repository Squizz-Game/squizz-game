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
            'SELECT q.id_quizz, q.image q_img, q.nom_quizz, q.id_categorie, u.user_name, COUNT(qu.id_question) total ' +
            'FROM quizz q ' +
            'LEFT JOIN utilisateurs u ' +
            'ON u.id_user = q.id_user ' +
            'LEFT JOIN questions qu ' +
            'ON qu.id_quizz = q.id_quizz ' +
            'WHERE q.id_categorie = ? ' +
            'GROUP BY q.id_quizz ' +
            'HAVING total > 9',
            [id],
            (err, rows) => {
            if (err) return action(true, err)
            console.log(rows.length);
            return action(false, rows)
        })
    },
    getByUser: (id, action) => {
        mysql.execute(
            'SELECT q.id_quizz, q.nom_quizz, q.image, q.id_categorie, q.id_user, COUNT(qu.id_question) total_questions ' +
            'FROM quizz q ' +
            'LEFT JOIN questions qu ON qu.id_quizz = q.id_quizz ' +
            'WHERE q.id_user = ? ' + 
            'GROUP BY q.id_quizz',
            [id],
            (err, rows) => {
            if (err) return action(true, err)
            return action(false, rows)
        })
    },
    get: (id, action) => {
        mysql.execute(
            'SELECT q.*, COUNT(qu.id_question) total FROM quizz q ' +
            'LEFT JOIN questions qu ON qu.id_quizz = q.id_quizz ' +
            'WHERE q.id_quizz = ? ' +
            'GROUP BY q.id_quizz ' +
            'HAVING total > 9',
            [id], (err, rows) => {
            if (err) return action(true, err)
            return action(false, rows[0])
        })
    },
    getForAdmin: (id, action) => {
        mysql.execute(
            'SELECT q.* FROM quizz q ' +
            'WHERE q.id_quizz = ?',
            [id], (err, rows) => {
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
    remove: ({id_quizz, id_user}, next) => {
        mysql.execute('SELECT image FROM quizz WHERE id_quizz = ? AND id_user = ?', [id_quizz, id_user], (err, rows) => {
            if (err) return next(true, err)
            if (rows.length < 1) return next(true, 'none')
            else {
                mysql.execute('DELETE FROM quizz WHERE id_quizz = ? AND id_user = ?', [id_quizz, id_user], (err, _) => {
                    if (err) return next(true, err)
                    return next(false, rows[0].image)
                })
            }
        })
        
    }
}

module.exports = Quizz