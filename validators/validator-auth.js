const { check } = require("express-validator");
const { stopValidate } = require("../middlewares/stop-validate");

const validateCreateUser = () => {
  return [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La clave debe tener 6 caracteres").isLength({ min: 6 }),
    stopValidate,
  ];
};

const validateLogin = () => {
  return [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La clave debe tener 6 caracteres").isLength({ min: 6 }),
    stopValidate,
  ];
};

module.exports = {
  validateCreateUser,
  validateLogin,
};
