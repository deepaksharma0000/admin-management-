const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');   
app.use(express.json());
app.use(cors());

const Admin = require('./routes/Admin');
const Master = require('./routes/master');
const User = require('./routes/user');
const Comman = require('./routes/comman');
// const db = require('./config/db');


app.use('/api/superadmin',Admin);
app.use('/api/master',Master);
app.use('/api/user',User);
app.use('/api/comman',Comman);

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000');
});
