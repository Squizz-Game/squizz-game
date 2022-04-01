const mysql = require('./mysql')
const bcrypt = require('bcrypt')

const User = {
    create: ({id_avatar, user_mail, user_name, user_password}, action) => {
        // Vérifier si tous les champs sont renseignés
        if (
            id_avatar === (undefined || '') ||
            user_mail === (undefined || '') ||
            user_name === (undefined || '') ||
            user_password === (undefined || '')
        ) return action(true, 'Veuillez renseigner tous les champs.')

        // Vérifier si aucun utilisateur n'existe avec ce username
        mysql.execute('SELECT * FROM utilisateurs WHERE user_name = ?', [user_name], async (err, rows) => {
            if (rows.length) return action(true, 'Le nom d\'utilisateur est déjà pris.')
            
            // Hasher le password
            user_password = await bcrypt.hash(user_password, await bcrypt.genSalt(8))
            
            // Enregistrer en bdd
            mysql.execute('INSERT INTO utilisateurs SET user_name = ?, mail = ?, password = ?, id_avatar = ?',
            [user_name, user_mail, user_password, id_avatar],
            (err, rows) => {
                if (err) return action(true, err)
                return action(false, rows.insertId)
            })
        })
    },
    update: ({id_avatar, user_mail, user_name, old_password, new_password, id_user}, action) => {
        // Vérifier si tous les champs obligatoires sont renseignés
        if (
            id_user === (undefined || '') ||
            id_avatar === (undefined || '') ||
            user_mail === (undefined || '') ||
            user_name === (undefined || '')
        ) return action(true, 'Veuillez renseigner tous les champs requis.')

        // Si un nouveau mot de passe est renseigné et que l'ancien est correct
        if (new_password !== (undefined || '')) {
            if (new_password.length < 6) {
                return action(true, 'Nouveau mot de passe trop court (6 caractères min.).')
            } else {
                mysql.execute(
                    'SELECT id_avatar, password FROM utilisateurs WHERE id_user = ?',
                    [id_user],
                    async (err, rows) => {
                        // Vérifier si l'ancien mot de passe tapé correspond à l'ancien
                        if (!err && bcrypt.compareSync(old_password, rows[0].password)) {
                            // Hasher le nouveau password
                            new_password = await bcrypt.hash(new_password, await bcrypt.genSalt(8))
                            
                            // Modifier les données avec le mot de passe
                            mysql.execute(
                                'UPDATE utilisateurs ' +
                                'SET user_name = ?, mail = ?, password = ?, id_avatar = ? '+
                                'WHERE id_user = ?',
                                [user_name, user_mail, new_password, id_avatar, id_user],
                                (err, rows) => {
                                    if (err) return action(true, err)
                                    return action(false, rows)
                                }
                            )
                        } else {
                            return action(true, 'L\'ancien mot de passe est incorrect.')
                        }
                    }
                )
            }
        } else {
            // Modifier les données sans le mot de passe
            mysql.execute(
                'UPDATE utilisateurs ' +
                'SET user_name = ?, mail = ?, id_avatar = ? '+
                'WHERE id_user = ?',
                [user_name, user_mail, id_avatar, id_user],
                (err, rows) => {
                    if (err) return action(true, err)
                    return action(false, rows)
                }
            )
        }
    },
    get: (user_id, action) => {
        if (user_id === (undefined || ''))
            return action(true, 'Aucun utilisateur connecté')

        mysql.execute('SELECT * FROM utilisateurs WHERE id_user = ?', [user_id], (err, rows) => {
            if (err) return action(true, err)

            return action(false, rows[0])
        })
    },
    check: ({user_name, user_password}, action) => {
        // Vérifier si tous les champs sont renseignés
        if (
            user_name === (undefined || '') ||
            user_password === (undefined || '')
        ) return action(true, 'Veuillez renseigner tous les champs.')

        // Vérifier si un utilisateur existe avec ce username
        mysql.execute('SELECT * FROM utilisateurs WHERE user_name = ?', [user_name], (err, rows) => {

            // Vérifier le password entré avec le password hashé
            if (!rows.length || !bcrypt.compareSync(user_password, rows[0].password))
                return action(true, 'Nom d\'utilisateur ou mot de passe incorrect.')

            // Envoyer l'id utilisateur
            return action(false, rows[0])
        })
    }
}

module.exports = User