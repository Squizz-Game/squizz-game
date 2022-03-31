const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.method === 'DELETE') {
        try {
            const decode = jwt.verify(req.cookies.token, process.env.JWTSECRET)
            if (decode.id === req.session.id_user) {
                next()
            } else {
                req.flash('error', 'Vous n\'avez pas les droits pour cette action.')
                res.clearCookie('token')
                req.session.id_user = undefined
                res.redirect('/connexion')    
            }
        } catch(e) {
            req.flash('error', 'Vous n\'avez pas les droits pour cette action.')
            res.clearCookie('token')
            req.session.id_user = undefined
            res.redirect('/connexion')   
        }
    } else {
        next()
    }
}