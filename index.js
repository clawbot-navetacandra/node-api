const express = require('express');
const main = require('./rest/_main')
const rp = require('request-promise');
const path = require('path');
const { readFileSync } = require('fs');
const { spawn } = require('child_process');

const app = express();

// const brainly = require('./helper/brainly');
// const savefrom = require('./helper/savefrom');

let d = new Date
function nulis(teks, name) {
    let fontPath = 'src/Zahraaa.ttf'
    let inputPath = 'src/nulis.jpg'
    let outputPath = 'tmp/hasil-' + name + '.jpg'
    let tgl = d.toLocaleDateString('id-Id')
    let hari = d.toLocaleDateString('id-Id', { weekday: 'long' })
    return spawn('convert', [
        inputPath,
        '-font',
        fontPath,
        '-size',
        '1024x784',
        '-pointsize',
        '20',
        '-interline-spacing',
        '1',
        '-annotate',
        '+806+78',
        hari,
        '-font',
        fontPath,
        '-size',
        '1024x784',
        '-pointsize',
        '18',
        '-interline-spacing',
        '1',
        '-annotate',
        '+806+102',
        tgl,
        '-font',
        fontPath,
        '-size',
        '1024x784',
        '-pointsize',
        '20',
        '-interline-spacing',
        '-7.5',
        '-annotate',
        '+344+142',
        teks,
        outputPath
    ]);
};


app.get('/nulis', function (req, res) {
        let q = req.query
        let text = decodeURIComponent(q['text'] || q['teks'] || '')
        let name = d.getTime()
        let hasilPath = path.resolve(`${__dirname}/tmp/hasil-${name}.jpg`)
	
	
        nulis(text, name)
            .on('error', e => {
                res.status(503);
                res.json({
                    status: "error",
                    message: 'Internal server error'
                })
            })
            .on('exit', () => {
                res.status(200)
                let hasil = readFileSync(hasilPath, 'base64');
                res.json({
                    status: 'success',
                    results: {
                        url: 'data:image/jpeg;base64,' + hasil,
                        mimetype: 'image/jpeg',
                        data: hasil
                    }
                })
            })
    })

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
        return
    }
}, 60000);


main(app)



app.listen(port, () => console.log('Running on port: ', port))