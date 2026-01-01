const express = require('express');
const router = express.Router();
const { getSensorData, updateSensorData } = require('../controllers/sensorController');

// App GETS data from here
router.get('/sensor', getSensorData);

// ESP32 POSTS data to here
router.post('/update', updateSensorData);

module.exports = router;