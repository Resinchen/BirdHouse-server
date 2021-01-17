const { Router } = require('express');
const fetch = require('node-fetch');

const Birdhouse = require('../models/Birdhouse');
const Point = require('../models/Point');

const router = Router();

const defaultVisiters = new Map([
    ['Sparrow', 0],
    ['Pigeon', 0],
    ['Crow', 0],
    ['Unknown', 0]
]);

const generate_display_name = (address_data) =>
    `${address_data['house_number'] || ''} ${address_data['road'] || ''} ${
        address_data['city_district'] || ''
    } ${address_data['city'] || address_data['county'] || ''} ${
        address_data['state'] || ''
    }`.trim();

router.get('/', async (req, res) => {
    console.log('get all BH');
    const birdhouses = await Birdhouse.find({}).populate('location');
    res.json(birdhouses);
});

router.post('/', async (req, res) => {
    console.log(req.body);
    const inner_data = await fetch(
        `https://eu1.locationiq.com/v1/reverse.php?key=1c163eb7f81fd0&lat=${req.body.latitude}&lon=${req.body.longitude}&format=json`
    ).then((data) => data.json());

    const display_name = generate_display_name(inner_data['address']);

    const locPoint = new Point({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    });

    await locPoint.save();

    const birdhouse = new Birdhouse({
        id_device: req.body._id,
        address: { ...inner_data['address'], display_name: display_name },
        location: locPoint,
        visiters: defaultVisiters,
    });

    await birdhouse.save();
    res.send(`Create new BH ${birdhouse}`);
});

module.exports = router;
