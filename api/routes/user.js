'use strict';

const express = require("express");
const User = require("../../models/user");
const auth = require('../../middleware/check_auth');
const UserController = require("../../controllers/user")
const router = express.Router();


// Redireciona para nosso controller onde fica a lógica para a tratativa da rota signup.
router.post("/signup", UserController.signup);

// Redireciona para nosso controller onde fica a lógica para a tratativa da rota signin.
router.get("/signin", UserController.signin);

// Redireciona para nosso controller onde fica a lógica para a tratativa da rota pesquisar usuário.
router.get("/:user_id", auth, UserController.get_user);


module.exports = router;