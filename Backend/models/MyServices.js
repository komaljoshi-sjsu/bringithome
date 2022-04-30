const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sSchema = new Schema({
    status: {
        type: String
    },
    serviceid: {
        type: String
    },
    userid: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    }
});

const MyServices = mongoose.model('MyServices',sSchema);
module.exports = MyServices;