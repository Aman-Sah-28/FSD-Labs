const mongoose = require("mongoose");

const touristSchema = new mongoose.Schema({

    name: String,
    email: String,
    phone: String,
    password: String,
    date: String,
    package: String,
    travellers: String,
    payment: String,
    file: String

});

module.exports = mongoose.model("Tourist", touristSchema);