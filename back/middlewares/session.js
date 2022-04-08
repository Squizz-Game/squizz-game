module.exports = (req, res, next) => {
    res.locals.session = req.session
    res.locals.session.min_questions = process.env.MIN_QUESTIONS
    next()
}