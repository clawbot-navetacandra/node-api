const brainly = require(__dirname + '/../helper/brainly');
const fs = require('fs');
const path = require('path')

async function modules(app) {
    app.get('/brainly', async function (req, res) {
        req.setTimeout(1000*3600)
        let fname = 'brainly'
        await brainly();
        setTimeout(() => {
            res.sendFile(path.resolve(`${__dirname}/../src/${fname}.jpg`))
        }, 1500);
    });
}

module.exports = modules