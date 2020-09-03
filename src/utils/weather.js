const request = require('request')
const geocode = require('./geocode')

const getWeather = function({latitude, longitude}, callback){

    //const {latitude, longitude} = location

    const url = 'http://api.weatherstack.com/current?access_key=b54be002fc477a7c6fb7bde06d22d58d&query='
     + latitude
     + ',' + longitude
     + '&units=m'

    request({
             url,
             json: true 
        },
        (error, {body}) => {
            if (error) {
                callback('Unable to connect to weather services!', undefined)
            } else if (body.error) {
                callback('Unable to find weather. Try another search.', undefined)
            } else {            
                const currentData = body.current;
                const data = {
                    temperature: currentData.temperature,
                    humidity: currentData.humidity
                }
                callback(undefined, data);
            }
    })      
}

const forecast = (location, callback) => {
    var errorMsg = undefined
    geocode.getGeocode(location, (error, data)=>{
        if(error){
            errorMsg = 'Error getting geocode:'+error
            console.log(errorMsg)
            callback({error: errorMsg}, undefined)
        }else{
            console.log(data)
            getWeather(data, (error, data)=>{
                if(error){
                    errorMsg = 'Error getting weather:'+error
                    console.log(errorMsg)
                    callback({error: errorMsg}, undefined)
                }else{
                    console.log(data)
                    callback(data, undefined)
                }})    
        }    
    })  
}

module.exports = {
    forecast,    
}