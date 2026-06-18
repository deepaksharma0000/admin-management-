
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



router.post('/login', async (req, res) => {
    const Admin = await admin.findOne({ email: req.body.email });

    if (!Admin) {
        return res.status(401).json({ message: ' Admin Not found ' });
    }

    const valid = await bcrypt.compare(req.body.password, Admin.password);
    if (!valid) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
        { email: Admin.email, id: Admin._id },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Auth successful', token: token });
});


router.post('/master', auth, async (req, res) => {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const Master = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashed,
        tenantDB: `tenant_${Date.now()}`
    });
    res.jason({ message: 'Master user created successfully', masterUser: Master });
});


router.get('/masters', auth, async (req, res) => {
    const masters = await User.find();
    res.json(masters);
});






module.exports = router;