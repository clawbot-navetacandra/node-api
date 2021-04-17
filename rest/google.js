const google = require(`${__dirname}/../helper/google`);

function h(app) {
    app.get('/google', async function (req, res) {
        let q = decodeURIComponent(req.query['q']);
        if (q !== "undefined") {
            let result = await google(q);
            if (result.length >= 1) {
                res.json({
                    status: "success",
                    results: result
                })
            } else {
                res.json({
                    status: "error",
                    message: "Pencarian tidak ditemukan!"
                })
            }
        } else {
            res.json({
                status: "error",
                message: "Mohon isi parameter q!",
                hint: "/google?q=Rest%20API"
            })
        }
    })
}

module.exports = h