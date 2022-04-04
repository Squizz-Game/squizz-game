module.exports = (req, res, next) => {
    let url = req.originalUrl;
    console.log(url)
    if (url.length > 1 && url.endsWith('/')) {
        res.redirect(url.substring(0, url.length - 1))
    } else {
        next()
    }
}