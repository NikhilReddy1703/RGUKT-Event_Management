// backend/models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  programName: { type: String, required: true },
  time: { type: Date, required: true },
  deadline: { type: Date, required: true },
  appliedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

module.exports = mongoose.model('Event', EventSchema);
