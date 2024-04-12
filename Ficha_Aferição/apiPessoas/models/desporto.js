const mongoose = require('mongoose');

const desportoSchema = new mongoose.Schema({
    _id: String,
    nome: String
}, { versionKey: false });

module.exports = mongoose.model('Desporto', desportoSchema);
