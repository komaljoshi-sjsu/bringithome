const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const custSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    phone: {
        type:String,
    },
    dp: {
        type:String,
    },
});

const Customer = mongoose.model('Customer',custSchema);
module.exports = Customer;