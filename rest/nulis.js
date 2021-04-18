let { spawn } = require('child_process');
let path = require('path')
const { readFileSync } = require('fs');

function nulis(teks, name) {
    let d = new Date
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

let handler = function (app) {

    app.get('/nulis', function (req, res) {
        let q = req.query
        let text = decodeURIComponent(q['text'] || q['teks'] || '')
        let name = decodeURIComponent(q['name'] || q['nama'] || '')
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

}

module.exports = handler