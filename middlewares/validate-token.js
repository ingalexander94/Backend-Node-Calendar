const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No tiene un token.",
    });
  }
  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "El token no es valido.",
    });
  }

  next();
};

module.exports = validateToken;
