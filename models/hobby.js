const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hobbySchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    favorite: { type: String, required: true }
});

const Hobby = mongoose.model('hobbies', hobbySchema);
module.exports = Hobby;