const request = require('postman-request');

const geocode = (address, callback) => {

    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXl1c2h0cmlwYXRoaSIsImEiOiJja2EyN2RsZ20wN2VtM2lwbmJuOHE3MzUzIn0.24b46fvzLFO7YDm5FCdMyA&limit=1';

    request({ url: geocodeURL, json: true }, (error, response) => {

        const data = response.body;

        if (error) {
            callback("Unable to connect to the service", undefined)
        }
        else if (data.features.length == 0) {
            callback("Unable to find location", undefined)
        }
        else {
            callback(undefined, {
                latitude: data.features[0].center[1],
                longitude: data.features[0].center[0],
                location: data.features[0].place_name
            })
        }


    })



}


module.exports = geocode