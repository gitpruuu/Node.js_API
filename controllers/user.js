'use strict';

const key = require("../env/config_keys");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {

    const { email } = req.body;

    const token = jwt.sign({ email: email }, key.jwt, {
        expiresIn: 1800,
    });

    req.body['token'] = token;

    try {
        const search = await User.findOne({ email })
        if (search) {
            res.status(409).send({
                mensagem: "E-mail já existente"
            })
            User.connection.close()
            return;
        } else {
            const user = await User.create(req.body);
            user.senha = undefined;
            res.status(201).send({
                mensagem: user
            });
            return;
        }
    }
    catch (error) {

        res.status(500).send({
            mensagem: error.message
        })
    }
}

exports.signin = async (req, res) => {

    const { email, senha } = req.body;
    const user = await User.findOne({ email }).select('+senha -__v');

    if (!user) {
        res.status(404).send({
            mensagem: "Usuário e/ou senha inválidos"
        })
        return;
    }
    if (! await bcrypt.compare(senha, user.senha)) {
        res.status(401).send({
            mensagem: "Usuário e/ou senha inválidos"
        })
        return;
    } else {

        user.senha = undefined;

        res.status(200).send({
            mensagem: user
        })
        await user.updateOne({ $set: { ultimo_login: Date.now() } });
        await user.updateOne({ $set: { data_atualizacao: Date.now() } });
    }
}

exports.get_user = async (req, res) => {
    console.log(req.params);

    const user_id = req.params.user_id;

    try {
        const user = await User.findById({ _id: user_id }).select('-__v')
        if (user) {

            res.status(200).send({
                mensagem: user
            })
            return;
        }
        else {
            res.status(404).send({
                mensagem: "Usuário não encontrado!"
            })
            User.connection.close()
            return
        }

    } catch (error) {
        res.status(500).send({
            mensagem: error.message
        });
        return;
    }
} 
