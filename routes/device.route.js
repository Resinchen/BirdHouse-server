const { Router } = require('express');
const get_tag = require('./image_recognition');
const post_tweet = require('./twiter');
const path = require('path');
const multer = require('multer');
const router = Router();
const fetch = require('node-fetch');
const Birdhouse = require('../models/Birdhouse');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.png');
        },
    }),
});

router.post('/photo', upload.single('cam'), async (req, res) => {
    console.log(`${JSON.stringify(req.body)}`);

    const filePath = path.dirname(__dirname) + '/uploads/' + req.file.filename;
    get_tag(filePath, async (error, value) => {

        const birdHouses = await Birdhouse.find({})
        const birdHouse = birdHouses.filter((bh) => bh.id_device == req.body.id_device)[0]

        console.log(typeof birdHouse);
        console.log(birdHouse);
        
        const key = value.charAt(0).toUpperCase() + value.slice(1);

        birdHouse.visiters.set(key, birdHouse.visiters.get(key) + 1);

        post_tweet(filePath, key, birdHouse.address.long_city)

        await birdHouse.save();

        res.json({
            error: error ? error : undefined,
            body: req.file.filename,
            tag: value,
        });
    });

});

module.exports = router;
