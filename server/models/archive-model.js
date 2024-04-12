const {Schema, model} = require('mongoose');

const ArchiveSchema = new Schema({
    year: {type: Number},
    title: {type: String},
    author: {type: String},
    text: {type: String},
    pictures:[String],
    isActual: {type: Boolean}
})

module.exports = model('Archive', ArchiveSchema);