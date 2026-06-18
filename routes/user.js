
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const getTenantDB = require('../config/tenantDB');
const User = require('../models/user');
const auth = require('../auth/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const admin = require('../models/admin');
const dotenv = require('dotenv');
const user = require('../models/user');
dotenv.config();




router.post('/signup', async (req, res) => {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashed
    });
    res.json({ message: 'User created successfully', user: user });
});


router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({ message: 'User Not found' });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({
        id: user._id,
        role: 'public'
    }, process.env.JWT_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: 'Auth successful', token: token });
});

router.get('/profile', auth, async (req, res) => {
    const user = await User.findById(req.userData.id);
    if (!user) {
        return res.status(404).json({ message: 'User Not found' });
    }
    res.json({ message: 'User profile', user: user });
});


module.exports = router;