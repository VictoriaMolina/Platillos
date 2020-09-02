const mongoose = require('mongoose');

const platilloSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    usadoEn: {
        type: Date,
        required: true,
        default: Date.now() - 1296000000
    },
    ingredientes: {
        type: [String]
    }
});

platilloSchema.index({usadoEn:1});

const Platillos = mongoose.model('Platillo', platilloSchema);

module.exports = {
    Platillos
}