'use strict'

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require("./src/routes/user");
const app = express();


// app.use(cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE');
    next()
});



app.use(logger('dev'));
app.use(express.json({ limit: '512mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware que direciona para nossa rota de usuario.
app.use('/api', userRoute)



// Se for informada uma URL inexistente o erro abaixo será retornado.
app.use(function (req, res, next) {
    res.status(404).json({
        mensagem: "End point não encontrado!"
    })
    next();
});


// middleware para tratar erros gerais caso não sejam tratados acima.
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    console.log(err);
    res.status(500).send({
        mensagem: err
    })
});


module.exports = app