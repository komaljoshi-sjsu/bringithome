const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const aSchema = new Schema({
    date: {
        type:Date,
        required:true
    },
    startTime:{
        type:Date,
        required:true
    },
    endTime: {
        type:Date,
        required:true
    },
    status: {
        type: String,
        required: true
    }

});

const Availibility = mongoose.model('Availibility',aSchema);
module.exports = Availibility;