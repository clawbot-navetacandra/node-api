const _attp = require(`${__dirname}/attp`);
const _bitly = require(`${__dirname}/bitly`);
const _brainly = require(`${__dirname}/brainly`);
const _glitchText = require(`${__dirname}/glitchText`);
const _google = require(`${__dirname}/google`);
const _gtranslate = require(`${__dirname}/gtranslate`);
const _jadwalsholat = require(`${__dirname}/jadwalsholat`);
const _kbbi = require(`${__dirname}/kbbi`);
const _nulis = require(`${__dirname}/nulis`);
const _ssweb = require(`${__dirname}/ssweb`);
const _tinyurl = require(`${__dirname}/tinyurl`);
const _ttp = require(`${__dirname}/ttp`);
const _utranslate = require(`${__dirname}/utranslate`);
const _ytb = require(`${__dirname}/yt-btn`);

function handler(app) {
    _attp(app);
    _brainly(app);
    _bitly(app);
    _glitchText(app);
    _google(app);
    _gtranslate(app);
    _jadwalsholat(app);
    _kbbi(app);
    _nulis(app);
    _ssweb(app);
    _tinyurl(app);
    _ttp(app);
    _utranslate(app);
    _ytb(app);
};

module.exports = handler