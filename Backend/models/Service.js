const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sSchema = new Schema({
    freelancer: {
        type: Object,
    },
    serviceCategory:  {
        type:String,
        required:true
    },
    serviceName:  {
        type:String,
        required:true
    },
    serviceMode:  {
        type:String,
        required:true
    },
    serviceDescription:  {
        type:String
    },
    responsibilities:  {
        type:String
    },
    price: {
        type:String,
        required:true
    },
    availability: {
        type:Object,
        required:true
    },
    servicePostedDate :{
        type:String
    }
});

const Services = mongoose.model('Services',sSchema);
module.exports = Services;