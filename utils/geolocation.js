const request = require('request');

const geoLocation = (address, callback) =>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoid2ludGVyc29pbCIsImEiOiJjanYxNDJhM3YxNjVzNDNvNDBhNW44d2ljIn0.PyhoaSxxRathoFS8cM-XOQ';
    request({ url, json: true }, (error, {body} = {} ) =>
    {
        if(error)
        {
            callback('Unable to connect to geo location service!', undefined);
        }
        else if(body.features.length === 0)
        {
            callback('Geo Location for city not found! Please try another search.', undefined);
        }
        else if(body.features.length > 0)
        {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                area: body.features[0].place_name
            });
        }
    });
}

module.exports = geoLocation;