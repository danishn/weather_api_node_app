const express = require('express')
const app = express()
const config = require('./config/config')

// middleware to check API Auth stuffs
const middleware = require('./config/middleware')

// Controllers handling the routes
const weather_controller = require('./routes/weather')

// logging some info for better debugging
app.use(function (req, res, next) {
    console.log("-------------------------------------------------------------------------")
    let date = new Date()
    console.log("[" + date.toISOString() + "] URL hit:: ", req.originalUrl)
    next()
})

// default index route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Open API Testing for weather report!</h1>')
})

// all weather releated routes goes here
app.get('/api/weather/:city_name', middleware.check_token, weather_controller.get_weather_by_city)

// if no routes found - fail safe
app.use(function (req, res) {
    res.status(500).send({
        status: "failure",
        message: "Route you are trying to access is not available",
    })
})

// start app on port from config
app.listen(config.PORT, () => {
    console.log(`Node app listening on port ${config.PORT}!`)
})