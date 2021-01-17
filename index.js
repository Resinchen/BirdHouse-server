const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/api/mobile', require('./routes/birdhouse.route'));
app.use('/api/device', require('./routes/device.route'));


async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://alexander:kuros@cluster0-ynz9h.mongodb.net/birdhouses',
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            }
        );

        app.listen(PORT, () => {
            console.log( 'Server has been started...');
        });
    } catch (e) {
        console.error(e);
    }
}

start();
