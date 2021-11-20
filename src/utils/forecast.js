const request = require('request')
const forecast=(latitude,longitude,callback)=>{
    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+latitude+'%2C'+longitude+'?unitGroup=us&key=QJ57XDNMRKXNA6L6MVQF5P75M'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!',undefined)
        } else if (body.error) {
           callback('Unable to find location',undefined)
    }else {
            callback(undefined,body.description+ ' It is currently ' + body.days[0].temp + ' degress out. There is a ' + body.days[0].precip + '% chance of rain.')   
        }
    })
}
module.exports=forecast