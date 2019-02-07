var mongoose = require("mongoose");

var user = mongoose.Schema({
    first_name: String,
    last_name : String,
    mobile_number: Number,
    email: String,
    password : String,
    comfirm_password: String,
    is_admin: Boolean,
    login_count: {type: Number, default: 0},
    created_on: {type: String, default: new Date().toISOString() }
});

module.exports = mongoose.model('User', user);