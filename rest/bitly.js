const bitly = require(__dirname + '/../helper/bitly');

async function m(app) {
    app.get('/bitly', async function (req, res) {
        req.setTimeout(1000*3600)
        const url = req.query['url'];
        if (url) {
            const result = await bitly(decodeURIComponent(url))
            if (result === "") {
                res.json({
                    status: "error",
                    message: "Link tidak dapat di-konversi!"
                })
            } else {
                res.json({
                    status: "success",
                    result: result
                })
            }
        } else {
            res.json({
                status: "error",
                message: "Mohon isi parameter url!",
                hint: "/bitly?url=https://google.com"
            })
        }
    })
}

module.exports = m