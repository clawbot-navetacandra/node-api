const gtranslate = require(__dirname + '/../helper/gtranslate');
const cacheHandler = require(__dirname + '/../translate.cache')

async function modules(app) {
    app.get('/translate/google', async function (req, res) {
        req.setTimeout(1000*3600)
        const from = req.query['lang_from'];
        const to = req.query['lang_target'];
        const text = req.query['text'];
        let teks = decodeURIComponent(text)
        if (from && text && to) {
            let cache = cacheHandler.get('google', teks)
            if (cache.data) {
                res.json({
                    status: "success",
                    results: {
                        before_translated: cache.data[0]._b,
                        translated: cache.data[0]._t
                    }
                })
            } else {
                let result = await gtranslate(decodeURIComponent(from).toLowerCase(), decodeURIComponent(to).toLowerCase(), teks.toLowerCase())
                cacheHandler.add('google', { _b: teks, _t: result });
                res.json({
                    status: "success",
                    results: {
                        before_translated: text,
                        translated: result
                    }
                })
            }
        } else {
            res.json({
                status: "error",
                message: "Mohon isi parameter dengan benar!",
                hint: "/translate/google?lang_from=indonesia&lang_target=inggris&text=hallo%20dunia"
            })
        }
    })
}

module.exports = modules