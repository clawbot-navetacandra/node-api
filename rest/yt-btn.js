const ytbutton = require(`${__dirname}/../helper/yt-button`);
const fs = require('fs')

function h(app) {
    app.get('/ytbutton', async function (req, res) {
        req.setTimeout(1000*3600)
        let type = req.query['type'];
        let name = req.query['name'];
        let _fname = req.query['fname'];
        let fname = 'ytb-' + new Date().getTime() + decodeURIComponent(_fname)
        if (name && type) {
            await ytbutton(decodeURIComponent(type).toLowerCase(), decodeURIComponent(name), fname);
            setTimeout(() => {
                let _file = fs.readFileSync(`${__dirname}/../src/${fname}.jpg`, 'base64');
                res.json({
                    status: 'success',
                    results: {
                        url: `data:image/jpeg;base64,` + _file,
                        data: {
                            mimetype: 'image/jpeg',
                            base64: _file
                        }
                    }
                })
            }, 2000);
        } else {
            res.json({
                status: "error",
                message: "Mohon isi parameter dengan benar!",
                hint: "/ytbutton?name=Naveta&type=gold"
            })
        }
    })
}

module.exports = h