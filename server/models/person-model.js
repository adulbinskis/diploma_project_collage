const {Schema, model} = require('mongoose');

const PersonSchema = new Schema({
    name: {type: String},
    surname: {type: String},
    pCode: {type: String, unique: true, required: true},
    phone: {type:String},
    group: {type: String},
    parish: {type:String},
    address: {type: String},
    date: {type: String},
    month: {type: Number},
    birthDay: {type: String},
    birthDayMonth:{type: Number},
    inventory:[String],
    
})

module.exports = model('Person', PersonSchema);