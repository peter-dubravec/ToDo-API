
// Authenticate user
module.exports = (passport) => {
    return function isAuth(req, res, next) {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                return res.status(401).json({ error: "Error while authorization." })
            }

            if (user) {
                req.user = user
                return next()
            }

            return res.status(401).json({ error: "Authorization failed." })

        })(req, res, next)
    }
}