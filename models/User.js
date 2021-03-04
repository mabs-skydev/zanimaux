const mongoose = require('mongoose');
const {ConsultationSchema} = require('./Consultation');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        min: 2
    },
    last_name: {
        type: String,
        required: true,
        min: 2
    },
    role: {
        type: String,
        enum: ["patient", "vet"],
        default: "patient"
    },
    phone: {
        type: String
    }, 
    consultations: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Consultation'
        }]
    }
});

const User = mongoose.model('User', UserSchema);

module.exports.User = User;