const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sSchema = new Schema({
    // serviceCategory: {
    //     type:Object,
    //     required:true
    // },
    // freelancers: [{
    //     type: Array,
    // }]
    companyName:  {
            type:String,
            required:true
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
    description:  {
        type:String
    },
    availability: {
        type:Object,
        required:true
    },
    minPrice: {
        type:String,
    },
    maxPrice: {
        type:String,
        required:true
    },
});

const Services = mongoose.model('Services',sSchema);
module.exports = Services;