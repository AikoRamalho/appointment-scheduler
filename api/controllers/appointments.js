const {Appointment, Slot} = Model;
const Nexmo = require('nexmo');

const appointmentController = {
  all(req, res){
    Appointment.find({}).exec((err, appointment)=>res.json(appointment));
  },
  create(req, res){
    var requestBody = req.body;

    var newslot = new Slot({
      slot_time: requestBody.slot_time,
      slot_date: requestBody.slot_date,
      created_at: Date.now()
    });
    newslote.save()
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
      requestBody.appointment;
    
    //and saves the record to the database
    newappointment.save((err, saved)=>{
      //returns the saved appointment after a successful save
      Appointment.find({_id: saved._id})
        .populate('slots')
        .exec((err, appointment)=>res.json(appointment));

      const from = VIRTUAL_NUMBER;
      const to = RECIPIENT_NUMBER;

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