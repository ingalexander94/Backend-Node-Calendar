/*
    Rutas: Usuario / auth
    host/api/auth
*/

const { Router } = require("express");
const { createUser, login, renew } = require("../controllers/auth");
const {
  validateCreateUser,
  validateLogin,
} = require("../validators/validator-auth");
const validateToken = require("../middlewares/validate-token");
const router = Router();

router.get("/renew", validateToken, renew);
router.post("/", validateLogin(), login);
router.post("/new", validateCreateUser(), createUser);

module.exports = router;
