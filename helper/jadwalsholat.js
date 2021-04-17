const fetch = require('node-fetch');
const API_URL = "https://api.pray.zone/v2/times/today.json?city=";

async function helper(city) {
    try {
        const res1 = await fetch(API_URL + city);
        const res = await res1.json()
        return res.results
    } catch (err) {
        if (err.message.includes('invalid json')) {
            return 404
        }
    }
}
module.exports = helper