const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sSchema = new Schema({
    serviceId: {
        type: String,
    },
    userId:  {
        type:String,
    },
    status:  {
        type:String,
    }
});

const MyServices = mongoose.model('MyServices',sSchema);
module.exports = MyServices;