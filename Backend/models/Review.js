const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sSchema = new Schema({
    rating: {
        type: Number
    },
    userid: { 
        type: String,
    },
    service: { 
        type: Schema.Types.ObjectId, 
        ref: 'services',
        required: [true,'No service id found']
    },
    postedOn: {
        type: String
    }, 
    review: {
        type: String
    }
});

const Review = mongoose.model('Review',sSchema);
module.exports = Review;