const mysql = require('./mysql')
const bcrypt = require('bcrypt')

// isvalid = bcrypt.compareSync(password, hash);

const User = {
    create: ({avatar_id, user_mail, user_name, user_password}, action) => {
        // Vérifier si tous les champs sont renseignés
        if (
            avatar_id === (undefined || '') ||
            user_mail === (undefined || '') ||
            user_name === (undefined || '') ||
            user_password === (undefined || '')
        ) return action(true, 'Veuillez renseigner tous les champs.')

        // Vérifier si aucun utilisateur n'existe à ce username
        mysql.execute('SELECT * FROM utilisateurs WHERE user_name = ?', [user_name], async (err, rows) => {
            if (rows.length) return action(true, 'Le nom d\'utilisateur est déjà pris.')
            
            // Hasher le password
            user_password = await bcrypt.hash(user_password, await bcrypt.genSalt(8))
            
            // Enregistrer en bdd
            mysql.execute('INSERT INTO utilisateurs SET user_name=?, mail = ?, password = ?, id_avatar = ?',
            [user_name, user_mail, user_password, avatar_id],
            (err, rows) => {
                if (err) return action(true, err)
                return action(false, rows.insertId)
            })
        })
    }
}

module.exports = User