'use strict';

const mongoose = require("../database/mongo_connect");
const bcrypt = require("bcryptjs");


const UserSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    },
    senha: {
        type: String,
        required: true,
        select: false,
        trim: true
    },
    telefones: {
        type: Object,
        required: true,
        trim: true
    },
    token: {
        type: String,
    },
    data_criacao: {
        type: Date,
        default: new Date().toLocaleString()

    },
    data_atualizacao: {
        type: Date,
        default: new Date().toLocaleString(),

    },
    ultimo_login: {
        type: Date,
        default: new Date().toLocaleString(),
    }
});

UserSchema.pre('save', async function (next) {
    try {
        const hash = await bcrypt.hash(this.senha, 10);
        this.senha = hash;
    } catch (error) {
        console.log(error);
    }


    next();
});



const User = mongoose.model('User', UserSchema);

module.exports = User;