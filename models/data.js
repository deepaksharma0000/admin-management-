const mongoose = require('mongoose');
const schema = new  mongoose.Schema({
    title:String,
    description:String,
},
{
    timestamps:true
});
module.exports = schema;