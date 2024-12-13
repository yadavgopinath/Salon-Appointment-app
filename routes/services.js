const express = require('express');
const  router = express.Router();
const serviceController = require('../controller/services');
const userAuthentication = require('../middleware/auth');

// Add a new service (Admin Only)
router.post(
    '/addservice',
   
    serviceController.addService
  );
  
  // Get all services (No Authentication Needed)
  router.get('/getservices', serviceController.getAllServices);
  
  // Get availability for a specific service
  router.get(
    '/:id/availability',
    userAuthentication.authenticate,
    serviceController.getAvailabilityByServiceId
  );
  
  // Add availability slots for a service (Admin Only)
  router.post(
    '/:id/addavailability',
    userAuthentication.authenticate,
    serviceController.addAvailability
  );
  
  // Book an appointment
  router.post(
    '/book',
    userAuthentication.authenticate,
    serviceController.bookAppointment
  );
  

module.exports = router;

