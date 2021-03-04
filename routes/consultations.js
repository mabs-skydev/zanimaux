const express = require('express');
const moment = require('moment');
const { Consultation } = require('../models/Consultation');
const { User } = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
    const consultations = await Consultation.find();

    res.json(consultations);
});

router.post('/', async (req, res) => {
    try {
        const consultation = new Consultation({
            patient: req.body.patient,
            vet: req.body.vet,
            starts_at: moment(req.body.starts_at).format('YYYY-MM-DD hh:mm'),
        });

        let vet = await User.findById(req.body.vet).populate('consultations');
        let patient = await User.findById(req.body.patient);

        if(!vet) return res.status(404).json({message: "vet doesnt exist"})
        if(!patient) return res.status(404).json({message: "patient doesnt exist"})
        
        
        if (!checkAppointement(req.body.starts_at, vet.consultations)) {
            vet.consultations = [...vet.consultations, consultation._id];
            patient.consultations = [...patient.consultations, consultation._id];

            vet.save();
            patient.save();
            
            await consultation.save();
            res.json(consultation);
        } else {
            res.status(400).json({message: "Already exists"})
        }

    } catch (err) {
        console.log("-----------------", err, "---------------------")
    }
});

router.patch('/:id/status', async (req, res) => {
    const consultation = await Consultation.findById(req.params.id);
    const types = ['approved', 'rejected'];

    if (!types.includes(req.body.status)) return res.status(400).json({
        success: false,
        message: 'Status should be "approved" or "rejected"'
    });

    if (!consultation) return res.status(404).json({
        success: false,
        message: 'Consultation not found!'
    })

    consultation.status = req.body.status;

    await consultation.save();

    res.json({
        success: true,
        data: consultation
    });
});

const compareDates = (firstDate, secondDate) => {
    firstDateTS = moment(firstDate).format('YYYY-MM-DD hh:mm');
    secondDateTs = moment(secondDate).format('YYYY-MM-DD hh:mm');
    endsAt = moment(secondDate).add(30, 'minutes').format('YYYY-MM-DD hh:mm');

    return moment(firstDateTS).isBetween(secondDateTs, endsAt);
}

const checkAppointement = (checkeddate, mydates) => {
    let result = false;
    
    for (const single of mydates) {
        console.log("aaaaaaaaaaaa", single.starts_at);
        if (compareDates(checkeddate, single.starts_at)) {
            result = true;
        }
    }

    return result;
}

module.exports = router;