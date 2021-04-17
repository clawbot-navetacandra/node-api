const glitchText = require(__dirname + '/../helper/textpro-glitch');
const fs = require('fs');

async function m(app) {
    app.get('/glitch-text', async function (req, res) {
        req.setTimeout(1000 * 3600)
        const text1 = req.query['text1'];
        const text2 = req.query['text2'];
        const fname = req.query['fname'];
        let name = 'textpro-' + new Date().getTime() + decodeURIComponent(fname)
        if (text1 && text2) {
            await glitchText(decodeURIComponent(text1), decodeURIComponent(text2), name)
            setTimeout(() => {
                let file = fs.readFileSync(`${__dirname}/../src/${name}.jpg`, 'base64')
                res.json({
                    status: 'success',
                    results: {
                        url: 'data:image/jpeg;base64,' + file,
                        data: {
                            mimetype: 'image/jpeg',
                            base64: file
                        }
                    }
                })
            }, 1500);
        } else {
            res.json({
                status: "error",
                message: "Mohon isi parameter dengan benar!",
                hint: "/glitch-text?text1=wassup&text2=brotherhood"
            })
        }
    })
}

module.exports = m