const request = require('request')

const config = require('../config/config')

module.exports = {
    get_weather_by_city: function(req, res) {
        try {
            // check if today is prime date
            const today = new Date()
            const date_today = today.getDate() // or set custome date to test

            // check if date is prime
            const isPrime = (number) => {
                for (let i = 2; i < number; i++) {
                    if (number % i === 0) return false
                }

                return number > 1
            }

            if (!isPrime(date_today)) {
                console.log("[Weather Request]: Date is not prime so no data.")
                return res.status(200).send({
                    status: "failure",
                    message: "Date is not prime so no data."
                })
            }

            if (!req.params.city_name) {
                return res.status(400).send({
                    status: "failure",
                    message: "Bad Request: missing required parameter: city_name"
                })
            }

            const city_name = req.params.city_name;
            const api_url = config.OPEN_API_BASE_URL + '/weather?APPID=' + config.OPEN_API_KEY
            const api_path = api_url + "&q=" + city_name

            console.log("[Weather Request]: Outgoing request:", api_path)

            request(api_path, function (error, response, body) {
                console.log("[Weather Request]: response:", response.statusCode, ' -- Data: ', body)
                if (response && response.statusCode == 200) {
                    res.status(200).send({
                        status: "success",
                        message: "Weather data retrieved successfully.",
                        data: JSON.parse(body)
                    })
                } else {
                    res.status(response.statusCode).send({
                        status: "failure",
                        message: error,
                        data: JSON.parse(body)
                    })
                }
            })

        } catch (e) {
            console.log('Execption occurred: ', e.message)

            res.status(500).send({
                status: "failure",
                message: "Internal Server Error. Contact your server admin for more details.",
            })
        }
    }
}