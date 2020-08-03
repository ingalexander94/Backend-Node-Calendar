const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../helpers/jwt");

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Valido que no exista
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe.",
      });
    }
    user = new User(req.body);

    // Encripto la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardo el usuario
    await user.save();

    //Generar token
    const token = await generateToken(user.id, user.name);

    res.status(201).json({
      ok: true,
      msg: "Usuario creado.",
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador.",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Busco por correo
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario no existe.",
      });
    }

    // Comparo las contraseñas
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña incorrecta.",
      });
    }

    // Genero el JWT
    const token = await generateToken(user.id, user.name);

    res.status(200).json({
      ok: true,
      msg: "Autenticado.",
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador.",
    });
  }
};

const renew = async (req, res) => {
  const { uid, name } = req;

  // Genero el JWT
  const token = await generateToken(uid, name);

  res.json({
    ok: true,
    msg: "Token renovado.",
    uid,
    name,
    token,
  });
};

module.exports = {
  createUser,
  login,
  renew,
};
