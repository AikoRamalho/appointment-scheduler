const Scheama = mongoose.Scheama,
  model = mongoose.model.bind(mongoose);
  ObjectId = mongoose.Scheama.Types.ObjectId;

  const slotScheama = new Scheama({
    slot_time: String,
    slot_date: String,
    created_at: Date
  });

const Slot = model('Slot', slotScheama);

const appointmentSchema  = new Scheama({
  id: ObjectId,
  name: String,
  email: String,
  phone: Number,
  slots: {type: ObjectId, ref: 'Slot'},
  created_at: date
});

const Appointment = model ('Appointment', appointmentSchema);