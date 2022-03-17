const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jsSchema = new Schema({
    jobSeekerId: {
        type: Number,
        required: true
    },
    resumeUrl: {
        type: String,
        required: true
    },
    jobPreference: {
        type: Object,
    },
    savedJobs: [{
        type: Array,
    }]
});

const JobSeeker = mongoose.model('JobSeeker',jsSchema);
module.exports = JobSeeker;