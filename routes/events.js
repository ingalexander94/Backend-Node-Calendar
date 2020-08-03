/*
    Rutas: Calendar / events
    host/api/events
*/

const { Router } = require("express");
const validateToken = require("../middlewares/validate-token");
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { validateEvent } = require("../validators/validator-events");

const router = Router();
router.use(validateToken);

router.get("/", getEvents);

router.post("/", validateEvent(), createEvent);

router.put("/:id", validateEvent(), updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
