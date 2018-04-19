const Model = require('../models/index')

const {Appointment, Slot} = Model;

const slotController = {
  all(req, res){
    Slot.find({})
      .exec((err, slots)=>res.json(slots))
  },

  create(req, res){
    var requestBody = req.body;

    var newslot = new Slot({
      slot_time: requestBody.slot_time,
      slot_date: requestBody.slot_date,
      created_at: Date.now()
    });

    newSlot.save((err, saved)=>{
      Slot
        .findOne({_id: saved_id})
        .exec((err, slot)=>res.json(slot));
    })
  },
  findByDate(req, res) {
    var slot_date = req.params.slot_date;
    console.log('slot date: ', slot_date);

    Slot.find({})
      .where('slot_date').equals(slot_date)
      .exec((err, slots)=>res.json(slots));
  }
};

module.exports = slotController;