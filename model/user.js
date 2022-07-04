const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    job: String,
    company: String,
    summary: String
});

module.exports = mongoose.model('User', userSchema);
