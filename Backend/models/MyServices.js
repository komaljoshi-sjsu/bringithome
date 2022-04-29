const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sSchema = new Schema({
    booked: {
        type: Object,
    },
    completed: {
        type: Object,
    },
    saved: {
        type: Object,
    }
});

const MyServices = mongoose.model('MyServices',sSchema);
module.exports = MyServices;