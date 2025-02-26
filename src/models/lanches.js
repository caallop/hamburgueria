/**
 * Modelo de dados (coleção - MongoDB)
 * Hamburgueres
 */

// Importando biblioteca do mongoose
const {model, Schema } = require('mongoose')

// Criando a estrutura de dados hamburguers para o banco de dados
const LanchesSchema = new Schema({
    nomeLanche:{
        type: String,
        unique: true
    },
    precoLanche:{
        type: Number,
    },
    descricaoLanche:{
        type: String,
    },
    imagemLanche:{
        type: String,
    }
}, {versionKey: false})

// Importação de modelo de dados
// Nome da coleção: lanches

module.exports = model('lanches', LanchesSchema)