const express = require('express');
const cors = require('cors');

const app = express();
// Render sets the PORT environment variable automatically
const PORT = process.env.PORT || 3000;

// 1. Middleware
app.use(cors()); 
app.use(express.json()); 

// 2. Routes

// ✅ FIX: Define the sensor route directly here to prevent 404 errors
app.post('/api/sensor', (req, res) => {
    // 1. Destructure the data sent from the simulator
    const { temperature, humidity, sensorId } = req.body;

    // 2. Log it to the console (View this in your Render Logs)
    console.log(`📡 Data Received -> Temp: ${temperature}°C, Hum: ${humidity}%`);

    // 3. (Optional) Save to Database logic would go here

    // 4. Send success response back to the simulator
    res.status(200).json({ 
        message: "Data received successfully", 
        timestamp: new Date() 
    });
});

// 3. Root check (Health Check)
app.get('/', (req, res) => {
    res.send('Incubator Backend is Running on Render!');
});

// 4. Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});