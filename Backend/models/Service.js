const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sSchema = new Schema({
    serviceCategory: {
        type:Object,
        required:true
    },
    freelancers: [{
        type: Array,
    }]

});

const Services = mongoose.model('Services',sSchema);
module.exports = Services;