const mongoose = require('mongoose');
const {UserSchema} = require('./User');

const ConsultationSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    vet: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    starts_at: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
},
{ timestamps: true });

const Consultation = mongoose.model('Consultation', ConsultationSchema);

module.exports.Consultation = Consultation;

//.populate('authors');