'use strict';

const secret = require("../../env/config_keys")
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {

    const tk = req.headers.authorization

    if (!tk) {
        return res.status(401).send({
            mensagem: 'Nenhum token foi informado!'
        });
    }

    const token = tk.split(" ")[1]

    jwt.verify(token, secret.jwt, function (err, decoded) {

        if (err) {
            res.status(401).send({
                mensagem: 'Token inválido!'
            });
        } else {
            req.email = decoded.email;

            next();
        }
    });
}


