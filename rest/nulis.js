const path = require('path');
const { spawn } = require('child_process');

function _nulis(name, teks) {
    let d = new Date()
    let fontPath = '../src/Zahraaa.ttf'
    let inputPath = '../src/nulis.jpg'
    let outputPath = '../src/hasil-' + name + '.jpg'
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
}

function nulis(app) {
    app.get('/nulis', async function (req, res) {
        let q = req.query;
        let teks = decodeURIComponent(q['teks'] || q['text'] || '');
        let name = new Date().getTime();
        let hasilPath = path.resolve(`${__dirname}/../src/hasil-${name}.jpg`)
        _nulis(name, teks)
            .on('error', (err) => res.json({
                status: 'error',
                message: 'internal server error',
                error: err
            }))
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
            });
    })
}

module.exports = nulis