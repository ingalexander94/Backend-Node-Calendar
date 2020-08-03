const Event = require("../models/Event");

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("user", "name");
    res.json({
      ok: true,
      msg: "Eventos listados.",
      events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador.",
    });
  }
};

const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    event.user = req.uid;
    const eventSaved = await event.save();
    res.status(200).json({
      ok: true,
      msg: "Evento creado.",
      event: eventSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador.",
    });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { uid } = req;
  try {
    // Buscar evento por su id
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "El evento no existe.",
      });
    }

    // Solo el que lo creo lo puede actualizar
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permiso para actualizar el evento.",
      });
    }

    const edit = {
      ...req.body,
      user: uid,
    };

    const eventUpdate = await Event.findByIdAndUpdate(id, edit, { new: true });
    res.status(200).json({
      ok: true,
      msg: "Evento actualizado.",
      event: eventUpdate,
    });
  } catch (error) {
    console.log(error);
    const msg =
      id.length !== 24
        ? "El identificador del evento no es valido"
        : "Por favor hable con el administrador.";
    res.status(500).json({
      ok: false,
      msg,
    });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const { uid } = req;
  try {
    // Buscar evento por su id
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "El evento no existe.",
      });
    }

    // Solo el que lo creo lo puede eliminar
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permiso para eliminar el evento.",
      });
    }

    await Event.findByIdAndDelete(id);
    res.status(200).json({
      ok: true,
      msg: "Evento eliminado.",
    });
  } catch (error) {
    console.log(error);
    const msg =
      id.length !== 24
        ? "El identificador del evento no es valido"
        : "Por favor hable con el administrador.";
    res.status(500).json({
      ok: false,
      msg,
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};
