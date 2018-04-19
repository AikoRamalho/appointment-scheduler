const Model = require('../models/index')

var ObjectId = require('mongodb').ObjectId;
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
  delete(req, res) {
    console.log(req.params._id);
    console.log(req.params);
    Slot.findByIdAndRemove(req.params._id)
      .then(slot=>{
        if(!slot){
          return res.status(404).send({
            message: 'Slot not found with _id: ' + req.params._id
          });
        }
        res.send({message: "Slot deleted!"});
      }).catch(err=>{
        if(err.kind === "ObjectId" || err.name === 'NotFound'){
          return res.status(404).send({
            message: 'Slot not found with id: ' + req.params._id
          });
        } 
        return res.status(500).send({
          message: "Couldn't delete slot with id: " + req.params._id
        });
      });
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