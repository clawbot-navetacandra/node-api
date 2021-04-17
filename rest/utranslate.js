const utranslate = require(__dirname + '/../helper/utranslate');
const cacheHandler = require(__dirname + '/../translate.cache')

async function modules(app) {
    app.get('/translate/u-dictionary', async function (req, res) {
        req.setTimeout(1000*3600)
        const from = req.query['lang_from'];
        const to = req.query['lang_target'];
        const text = req.query['text'];
        let teks = decodeURIComponent(text)
        if (from && text && to) {
            if (cacheHandler.get('u-dictionary', teks).data) {
                let result = cacheHandler.get('u-dictionary', teks);
                res.json({
                    status: "success",
                    results: {
                        before_translated: result.data[0]._b,
                        translated: result.data[0]._t
                    }
                })
            } else {
                let result = await utranslate(decodeURIComponent(from).toLowerCase(), decodeURIComponent(to).toLowerCase(), teks);
                console.log({_b: teks, _t: result});
                cacheHandler.add('u-dictionary', {_b: teks, _t: result})
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
                hint: "/translate/u-dictionary?lang_from=indonesia&lang_target=inggris&text=hallo%20dunia"
            })
        }
    })
}

module.exports = modules