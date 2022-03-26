const mysql = require('./mysql')
const Question = require('./question')

const Reponse = {
    update: ({ reponse, correct, id_question, id_reponse }, next) => {
        // Si une réponse est spécifiée, la mettre à jour
        if (id_reponse && reponse !== '') {
            mysql.execute(
                'UPDATE reponses SET reponse = ?, correct = ? WHERE id_reponse = ?',
                [reponse, correct, id_reponse],
                (err, rows) => {
                    if (err) return next(true, err)
                    else return next(false, 'réponse mise à jour')
                }
                )
        // Si une réponse est spécifiée mais est vide, la supprimer
        } else if (id_reponse && reponse === '') {
            console.log('rep:', reponse === '')
            mysql.execute(
                'DELETE FROM reponses WHERE id_reponse = ?',
                [id_reponse],
                (err, rows) => {
                    if (err) return next(true, err)
                    else return next(false, 'réponse supprimée')
                }
            )
        // Si aucune réponse n'est spécifiée, la créer
        } else if (id_question && reponse !== '') {
            mysql.execute(
                'INSERT INTO reponses SET reponse = ?, correct = ?, id_question = ?',
                [reponse, correct, id_question],
                (err, rows) => {
                    if (err) return next(true, err)
                    else return next(false, 'réponse créée')
                }
            )
        }
    }
}

module.exports = Reponse