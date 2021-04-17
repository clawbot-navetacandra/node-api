const ttp = require(__dirname + '/../helper/ttp');

async function modules(app) {
    app.get('/ttp', async function (req, res) {
        req.setTimeout(1000*3600)
        const text = req.query['text'];
        if (text) {
            let b = await ttp(decodeURIComponent(text));
            let _b = b.replace('data:', '').split(';base64,')
            res.json({
                status: 'success',
                results: {
                    url: b,
                    data: {
                        mimetype: _b[0],
                        base64: _b[1]
                    }
                }
            })
        } else {
            res.json({
                status: "error",
                message: 'Mohon isi parameter url!',
                hint: '/ttp?text=hello world'
            })
        }
    });
}

module.exports = modules