const { check } = require("express-validator");
const { stopValidate } = require("../middlewares/stop-validate");
const moment = require("moment");

validateEvent = () => {
  return [
    check("title", "El titulo es obligatorio").not().isEmpty().isString(),
    check("start", "La fecha inicial es obligatoria").custom(isDate),
    check("end", "La fecha final es obligatoria").custom(isDate),
    stopValidate,
  ];
};

const isDate = (value) => {
  if (!value) return value;
  const date = moment(value);
  return date.isValid() ? true : false;
};

module.exports = {
  validateEvent,
};
