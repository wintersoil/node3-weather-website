const request = require('request');

const forecast = (latitude, longitude, callback) =>
{
    const url = 'https://api.darksky.net/forecast/369ed9a3650afe0391465d3a5925de9d/' + latitude + ',' + longitude +'?units=si';
    request({ url, json: true }, (error, {body}) => {
        if(error)
        {
            callback('Unable to connect to forecast services!', undefined);
        }
        else if(body.error)
        {
            callback(body.error, undefined);
        }
        else
        {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipitation: body.currently.precipProbability
            });
        }
    })
}

module.exports = forecast;