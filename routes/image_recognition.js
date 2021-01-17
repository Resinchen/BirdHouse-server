const { Router } = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const request = require('request');

api_key = '';
api_secret = '';

const TAGS = ['pigeon', 'sparrow', 'crow'];

module.exports = async function (filepath, callback) {
    formData = {
        image: fs.createReadStream(filepath),
    };

    request
        .post(
            { url: 'https://api.imagga.com/v2/tags', formData: formData },
            function (error, response, data) {
                tag = JSON.parse(data)
                    ['result']['tags'].map((elem) => elem['tag']['en'])
                    .filter((tag) => TAGS.includes(tag))[0] ;
                callback(error, tag)
            }
        )
        .auth(api_key, api_secret, true);
};
