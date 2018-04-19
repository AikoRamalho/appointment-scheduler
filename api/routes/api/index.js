var express = require('express');

const router = express.Router();

const appointmentController = require('../../controllers/appointments');
const slotController = require('../../controllers/slot');

router.get('/appointments', appointmentController.all);
router.get('/retriveSlots', slotController.all);
router.delete('/slots/:_id', slotController.delete);
router.delete('/appointments/:id', appointmentController.delete);
router.post('/appointmentCreate', appointmentController.create);

module.exports = router;