'use strict';

const mongoose = require("mongoose");
const Config = require("../infra/mongo");

let uri = Config.Mongo_Uri;

mongoose.Promise = global.Promise;

mongoose.connect(uri, {

    useNewUrlParser: true,
    poolSize: 10,
    reconnectInterval: 1000,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected on database!");
    })
    .catch(error => {
        return error;
    });


module.exports = mongoose;