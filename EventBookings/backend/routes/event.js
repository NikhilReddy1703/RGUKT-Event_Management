// backend/routes/event.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Student = require('../models/Student');
router.post('/create', async (req, res) => {
    const { programName, time, deadline } = req.body;
  
    try {
      const newEvent = new Event({ programName, time, deadline });
      await newEvent.save();
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Route to get all events
  router.get('/', async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Route to download the student list for an event
  router.get('/download/:id', async (req, res) => {
    try {
      const event = await Event.findById(req.params.id).populate('appliedStudents');
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.status(200).json(event.appliedStudents);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
// Route to register a student for an event
router.post('/register/:id', async (req, res) => {
  const { studentId } = req.body;
  try {
    const event = await Event.findById(req.params.id);
    console.log(event);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    console.log(studentId);
    const student = await Student.findById(studentId);
    console.log(student);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    console.log(student);
    if (!event.appliedStudents.includes(studentId)) {
      event.appliedStudents.push(studentId);
      await event.save();
    }

    res.status(200).json({ message: 'Student registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
