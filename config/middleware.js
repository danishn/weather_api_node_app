const config = require('../config/config')

module.exports = {
    check_token: function(req, res, next) {
        try {
            if (!req.headers.api_key || req.headers.api_key !== config.API_KEY) {
                console.log("[Middleware] Error: invalid or missing API KEY in header.")

                res.status(403).send({
                    status: "failure",
                    message: "Authorization failed. API Key not provided"
                })

            } else {
                console.log("[Middleware]: API Key check passed.")
                next()
            }

        } catch (e) {
            console.log('Execption occurred: ', e.message)

            res.status(500).send({
                status: "failure",
                message: "Internal Server Error. Contact your server admin for more details.",
            })
        }
    }
}