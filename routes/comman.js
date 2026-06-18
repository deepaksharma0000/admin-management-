const express = require('express');
const router = express.Router();
const getTenantDB = require('../config/tenantDB');
const user = require('../models/user');
const auth = require('../auth/auth');

router.post('/data', auth, async (req, res) => {
    const conn = await getTenantDB(req.user.TenantDB);
    const Data = conn.model('Data', DataSchema);
    const result = await Data.create(req.body);
    res.json(result);
});


router.get('/data', auth, async (req, res) => {
    const conn = await getTenantDB(req.user.TenantDB);
    const Data = conn.model('Data', DataSchema);
    const data = await Data.find();
    res.json(data);
});

router.get('/data/:id', auth, async (req, res) => {
    const conn = await getTenantDB(req.user.TenantDB);
    const Data = conn.model('Data', DataSchema);
    const data = await Data.findById(req.params.id);
    res.json(data);
});

router.put('/data/:id', auth, async (req, res) => {
    const conn = await getTenantDB(req.user.TenantDB);
    const Data = conn.model('Data', DataSchema);
    const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedData);
});

router.delete('/data/:id', auth, async (req, res) => {
    const conn = await getTenantDB(req.user.TenantDB);
    const Data = conn.model('Data', DataSchema);
    await Data.findByIdAndDelete(req.params.id);
    res.json({ message: 'Data deleted successfully' });
});



module.exports = router;