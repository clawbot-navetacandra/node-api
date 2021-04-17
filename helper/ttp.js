const fetch = require('node-fetch');

async function helper(text) {
    let _fetch = await fetch('https://api.xteam.xyz/ttp?text=' + encodeURIComponent(text),
        { mode: 'no-cors', timeout: 1000 * 3600});
    let _res = await _fetch.json();
    let _base64URI = await _res.result;
    return _base64URI
}

module.exports = helper