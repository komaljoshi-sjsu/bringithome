const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const flSchema = new Schema({
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
    dateofbirth: {
        type:String,
    },
    // dp: {
    //     type:String,
    // },
    address:{
        type:String,
    },
    city: {
        type:String,
    },
    state :{
        type:String,
    },
    country:{
        type:String,
    },
    zipcode:{
        type:String,
    },
    availableServices: {
        type: Array,
    }

});

const Freelancer = mongoose.model('Freelancer',flSchema);
module.exports = Freelancer;