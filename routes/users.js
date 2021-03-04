const express = require('express');
const { User } = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find().populate('consultations');
    
        res.json(users);
    } catch(err) {
        console.log("error", err);
    }
});

router.post('/', async (req, res) => {
    const user = new User({
        first_name: req.body.first_name,   
        last_name: req.body.last_name,   
        phone: req.body.phone,   
        role: req.body.role? req.body.role : 'patient',   
    })

    await user.save();

    res.json(user)
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    res.json(user)
});

router.delete('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    await user.delete();

    res.json(user)
});

router.put('/:id', async (req, res) => {
    const user = await User.findOneAndUpdate({id: req.params.id}, {
        first_name: req.body.first_name,   
        last_name: req.body.last_name,   
        phone: req.body.phone,
    });

    await user.delete();

    res.json(user)
});

module.exports = router;