const express = require('express');
const main = require('./rest/_main')
const rp = require('request-promise');


// const brainly = require('./helper/brainly');
// const savefrom = require('./helper/savefrom');

const app = express();
let port = process.env.PORT || 443

app.use((req, res, next) => {
    req.setTimeout(1000*3600)
    res.setTimeout(1000*3600)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    next()
})

app.get('/anti-idling-api-heroku', (req, res) => {
    res.sendStatus(200);
});

setInterval(async () => {
    try {
        await rp(`http://${process.env.LOCAL_URL}/anti-idling-api-heroku`)
    } catch (err) {
        retur
    }
}, 60000);


main(app)



app.listen(port, () => console.log('Running on port: ', port))