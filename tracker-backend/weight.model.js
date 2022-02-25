const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Weight = new Schema({
    weight_user: {
        type: String
    },
    weight_date: {
        type: String
    },
    weight_lbs: {
        type: Number
    }
});

module.exports = mongoose.model('Weight', Weight);
