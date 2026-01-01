// A simple variable to store the latest data in memory
// (In a real production app, you would save this to a database like MongoDB)
let latestReadings = {
    temperature: 0,
    humidity: 0,
    lastUpdated: null
};

// 1. RECEIVE Data (ESP32 Pushes here)
const updateSensorData = (req, res) => {
    const { temperature, humidity } = req.body;

    if (temperature === undefined || humidity === undefined) {
        return res.status(400).json({ error: "Missing data" });
    }

    // Save to memory
    latestReadings = {
        temperature,
        humidity,
        lastUpdated: new Date().toISOString()
    };

    console.log(`[DATA RECEIVED] Temp: ${temperature}°C, Hum: ${humidity}%`);
    res.status(200).json({ message: "Data received successfully" });
};

// 2. SERVE Data (App Reads from here)
const getSensorData = (req, res) => {
    // Send the last stored value
    res.status(200).json({
        success: true,
        data: latestReadings
    });
};

module.exports = { updateSensorData, getSensorData };