var mongoose = require("mongoose");

var address = mongoose.Schema({
    user_id: String,
    address_line_1: String,
    address_line_2: String,
    mobile_number: Number,
    alternate_phone: Number,
    city: String,
    city_id: String,
    country: String,
    country_id: String,
    first_name: String,
    last_name: String,
    state: String,
    state_id: String,
    zip_code: Number,
    relationships  : Number ,
    created_on: {type: String, default: new Date().toISOString() }
})

module.exports = mongoose.model('Address', address);
