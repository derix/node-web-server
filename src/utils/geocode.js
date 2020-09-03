const request = require('request')

const getGeocode = function(location, callback){
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1Ijoib3JlbmRlcmkiLCJhIjoiY2tlazI5bjU1MWQzcTJ1cWJyd28xdXRyeiJ9.YKjiIDIfNs2iVOLtMdyq8w&limit=1'

    request({ 
        url: geocodeURL, 
        json: true 
        }, 
        (error, response) => {
            if (error) {
                callback('Unable to connect to location services!', undefined)
            } else if (response.body.features.length === 0) {
                callback('Unable to find location. Try another search.', undefined)
            } else {
                const latitude = response.body.features[0].center[1]
                const longitude = response.body.features[0].center[0]
                const data = {
                    latitude,
                    longitude
                }
                callback(undefined, data);
        }
       })     
}


module.exports = {
    getGeocode,   
}