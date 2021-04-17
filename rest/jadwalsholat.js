const jadwalsholat = require(__dirname + '/../helper/jadwalsholat');

async function m(app) {
    app.get('/jadwalsholat', async function (req, res) {
        req.setTimeout(1000*3600)
        const city = req.query['kota'];
        // const result = await jadwalsholat(city)
        if (city) {
            let result = await jadwalsholat(decodeURIComponent(city))
            if (result !== 404) {
                res.json({
                    status: 'success',
                    results: result
                })
            } else {
                res.json({
                    status: "error",
                    message: "Kota tidak dapat ditemukan!",
                })
            }
        } else {
            res.json({
                status: "error",
                message: "Mohon isi parameter kota!",
                hint: "/jadwalsholat?kota=mecca"
            })
        }
    })
}

module.exports = m