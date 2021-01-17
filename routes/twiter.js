const Twit = require('twit');

const config = ''


module.exports = function (filepath, tag, address) {
    const T = new Twit({config});
    const tweet = {status: `Сегодня по адресу ${address} залетел ${tag}`}
    T.post('statuses/update', tweet)
    T.postMediaChunked({ file_path: filepath })
}