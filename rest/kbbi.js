const kbbi = require(`${__dirname}/../helper/kbbi`);

function h(app) {
    app.get('/kbbi', async function (req, res) {
        req.setTimeout(1000*3600)
        let entri = req.query['entri'];
        if (entri) {
            const result = await kbbi(decodeURIComponent(entri));
            if (result !== 404) {
                res.json({
                    status: "success",
                    results: {
                        entri: decodeURIComponent(entri),
                        arti: result
                    }
                })
            } else {
                res.json({
                    status: "error",
                    message: "Entri tidak ditemukan."
                })
            }
        } else {
            res.json({
                status: "error",
                message: "Mohon isi parameter entri!",
                hint: "/kbbi?entri=republik"
            })
        }
    })
}

module.exports = h