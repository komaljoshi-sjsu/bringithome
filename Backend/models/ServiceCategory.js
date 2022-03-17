const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const scSchema = new Schema({
    name: {
        type:String,
        required:true
    }

});

const ServiceCategory = mongoose.model('ServiceCategory',scSchema);
module.exports = ServiceCategory;