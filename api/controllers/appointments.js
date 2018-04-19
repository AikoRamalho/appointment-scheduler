const Model = require('../models/index')

const {Appointment, Slot} = Model;
const Nexmo = require('nexmo');

const appointmentController = {
  all(req, res){
    Appointment.find({}).exec((err, appointment)=>res.json(appointment));
  },
  delete(req, res){
    Appointment.findByIdAndRemove(req.params.id)
      .then(appointment=>{
        if(!appointment){
          return res.status(404).send({
            message: 'Appointment not found with id: ' + req.params.id
          });
        }
        res.send({message: 'appointment deleted'});
      }).catch(err=>{
        if(err.kind === "ObjectId" || err.name === "NotFound"){
          return res.status(404).send({
            message: 'Appointment not found with id: ' + req.params.id
          });
        }
        return res.status(500).send({
          message: 'Coulnt retrieve appointment with id: ' + req.params.id
        });
      });
  },
  create(req, res){
    var requestBody = req.body;

    var newslot = new Slot({
      slot_time: requestBody.slot_time,
      slot_date: requestBody.slot_date,
      created_at: Date.now()
    });
    newslot.save()
    //Creates a new record from a submitted form
    var newappointment = new Appointment({
      name: requestBody.name,
      email: requestBody.email,
      phone: requestBody.phone,
      slots: newslot._id
    });

    const nexmo = new Nexmo({
      apiKey: "2cb37d02",
      apiSecret: "Iug09n86LHsKYbFu"
    });

    let msg =
      requestBody.name+
      " " + 
      "this is the message to confirm your appointment at" +
      " " +
      requestBody.slot_date;
    
    //and saves the record to the database
    newappointment.save((err, saved)=>{
      //returns the saved appointment after a successful save
      Appointment.find({_id: saved._id})
        .populate('slots')
        .exec((err, appointment)=>res.json(appointment));

      const from = "My App";
      const to = 5521993028426;

      nexmo.message.sendSms(from, to, msg, (err, responseData)=>{
        if(err){
          console.log(err)
        }else{
          console.dir(responseData);
        }
      });
    });
  }
};

module.exports = appointmentController;