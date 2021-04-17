/**
 * 
 * @param {String} type 
 */

const fs = require('fs');
const path = require('path');
let cacheLoc = path.join(__dirname, 'translate.cache.json')
module.exports = {
    get: function (type = 'google', _btranslate) {
        let cache = JSON.parse(fs.readFileSync(cacheLoc));
        let res = cache[type].filter(v => v._b === _btranslate);
        if (res.length >= 1) {
            return {
                path: cacheLoc,
                data: res
            }
        } else {
            return {
                path: cacheLoc,
                data: undefined
            }
        }
    },
    add: function (type = 'google', data = {_b: '', _t:''}) {
        let cache = JSON.parse(fs.readFileSync(cacheLoc));
        cache[type].push(data);
        fs.writeFileSync(cacheLoc, JSON.stringify(cache))
    }
}