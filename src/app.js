const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middleware
app.use(cors()); 
app.use(express.json()); 

// --- TEMPORARY STORAGE ---
// This variable will hold the latest data sent by the simulator
let currentSensorData = {
    temperature: 0,
    humidity: 0,
    lastUpdated: null
};

// 2. Routes

// RECEIVE Data (from Simulator)
app.post('/api/sensor', (req, res) => {
    const { temperature, humidity } = req.body;
    
    // Update the storage variable
    currentSensorData = {
        temperature,
        humidity,
        lastUpdated: new Date()
    };

    console.log(`✅ Stored -> Temp: ${temperature}°C, Hum: ${humidity}%`);
    
    res.status(200).json({ message: "Data received" });
});

// SEND Data (to your App)
// This is the missing part your app is looking for!
app.get('/api/sensor', (req, res) => {
    res.json(currentSensorData);
});

// Root check 
app.get('/', (req, res) => {
    res.send('Incubator Backend is Running!');
});

// 3. Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});