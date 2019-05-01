const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geolocation = require('./utils/geolocation');
const forecast = require('./utils/forecast')

console.log(__dirname);
console.log(__filename);

console.log(path.join(__dirname, "/public"))
const port = process.env.PORT || 3000;
const app = express();



app.use(express.static(path.join(__dirname, "/public")));

app.set('view engine', 'hbs')


app.get('/about', (req, res) => {
    res.render('about', {
        name:"Ali",
        age: 29
    });
});

app.get('', (req, res) => {
    res.render('index', {
        name: "Ali",
        age: 29
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        res.send({ error: 'Please provide an address '})
    }
    else
    {
        geolocation(req.query.address, (error, { latitude, longitude, area } = {}) =>
        {
            if(error)
            {
                return res.send({
                    error
                })
            }
            else
            {
                forecast(latitude, longitude, (error, { summary, temperature, precipitation, oneDayAfterTempLow, oneDayAfterTempHigh, twoDayAfterTempLow, twoDayAfterTempHigh, threeDayAfterTempLow, threeDayAfterTempHigh, icon  }) =>{
                    if(error)
                    {
                        return res.send({ error })
                    }
                    else
                    {
                        res.send({ summary, temperature, precipitation, location: req.query.address, area, oneDayAfterTempLow, oneDayAfterTempHigh, twoDayAfterTempLow, twoDayAfterTempHigh, threeDayAfterTempLow, threeDayAfterTempHigh, icon })
                    }
                });
            }
        });
    }
});

app.get('/help', (req, res) => {
    res.render('help', {
        name:"Ali",
        age: 29
    });
});

app.get('*', (req, res) => {
    res.send({error: 'Page not found.'})
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});