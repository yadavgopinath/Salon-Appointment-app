// controllers/serviceController.js
const Service = require('../models/services');
const Availability = require('../models/availibility');
const Appointment = require('../models/Appointment');

// Add a new service
exports.addService = async (req, res) => {
    try {
      const { name, description, price, duration, imageUrl } = req.body;
      console.log(name, description, price, duration, imageUrl);
  
      // Validate required fields
      if (!name || !description || !price || !duration || !imageUrl) {
        return res.status(400).json({ message: 'All fields are required!' });
      }
  
      // Create new service
      const newService = await Service.create({
        name,
        description,
        price,
        duration,
        imageUrl,
      });
  
      res.status(201).json({
        message: 'Service added successfully!',
        service: newService,
      });
    } catch (error) {
      console.error('Error adding service:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Get all services
  exports.getAllServices = async (req, res) => {
    try {
      const services = await Service.findAll();
      console.log(JSON.stringify(services));
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get availability for a specific service
  exports.getAvailabilityByServiceId = async (req, res) => {
    try {
      const { id } = req.params;
      const availability = await Availability.findAll({
        where: { serviceId: id, isBooked: false },
      });
      res.json(availability);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Add availability slots
  exports.addAvailability = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access Denied' });
      }
      const { id } = req.params;
      const { date, timeSlot } = req.body;
      const availability = await Availability.create({
        serviceId: id,
        date,
        timeSlot,
      });
      res.status(201).json(availability);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Book an appointment
  exports.bookAppointment = async (req, res) => {
    try {
      const { serviceId, date, timeSlot } = req.body;
  
      // Check availability
      const availability = await Availability.findOne({
        where: { serviceId, date, timeSlot, isBooked: false },
      });
      if (!availability) {
        return res.status(400).json({ message: 'Time slot not available' });
      }
  
      // Create appointment
      const appointment = await Appointment.create({
        userId: req.user.id,
        serviceId,
        date,
        timeSlot,
      });
  
      // Mark availability as booked
      availability.isBooked = true;
      await availability.save();
  
      res.status(201).json(appointment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };