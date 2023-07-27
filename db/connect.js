const mongoose = require('mongoose');

const connectDb = (uri) => {
    return mongoose.connect(uri)
        .then(value => console.log('connected to db'))
        .catch(err => console.log(err));
}

module.exports = connectDb;
