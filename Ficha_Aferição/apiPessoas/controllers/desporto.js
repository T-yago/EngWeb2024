const desporto = require('../models/desporto')
var Desporto = require('../models/desporto')

module.exports.list = () => {
    return Desporto
        .find()
        .sort({nome: 1})
        .exec()
}

module.exports.findById = id => {
    return Desporto
        .findOne({_id: id})
        .exec()
}

module.exports.insert = Desporto => {
        return Desporto.create(Desporto)
}

module.exports.updateDesporto = (id, Desporto) => {
    return Desporto.updateOne({_id:id}, Desporto)
}