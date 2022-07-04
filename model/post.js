const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    category: String,
    imageUrl: String,
    description: String,
    userId: String
});

module.exports = mongoose.model('Post', postSchema);