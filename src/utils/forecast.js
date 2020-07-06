const request = require('postman-request');

const forecast = (latitude ,longitude ,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=7521f14b79aa0fc2f091bfdc2a707cfc&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '';

    request({ url: url, json: true }, (error , response) => {

        if (error) {
            callback("Unable to connect", undefined)
        }
        else if (response.body.error) {
            callback("Invalid Location", undefined)
        }
        else {

            const data = {

                location: response.body.location.name,

                temperature: response.body.current.temperature,

                description: response.body.current.weather_descriptions


            }

            callback(undefined, data)
        }



    })
     


}

module.exports = forecast