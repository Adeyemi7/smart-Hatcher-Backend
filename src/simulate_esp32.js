// ---------------------------------------------------------
// VIRTUAL ESP32 SIMULATOR (UPDATED FOR RENDER)
// ---------------------------------------------------------
// 1. Install Axios first: npm install axios
// 2. Run this script:     node src/simulate_esp32.js
// ---------------------------------------------------------

const axios = require('axios'); 

// TARGET: Your live Render Backend
// NOTE: I changed '/api/update' to '/api/sensor' to match your previous request.
// If your backend route is named 'update', change 'sensor' back to 'update'.
const SERVER_URL = "https://smart-hatcher-backend.onrender.com/api/sensor"; 

console.log("--- STARTING VIRTUAL ESP32 ---");
console.log(`Target: ${SERVER_URL}`);

function pushData() {
    // 1. Generate Fake Data (Random fluctuation)
    // Temp: 37.0 - 38.0 | Humidity: 60.0 - 65.0
    const temp = (37 + Math.random()).toFixed(1);
    const hum = (60 + Math.random() * 5).toFixed(1);

    // 2. Prepare JSON payload
    // Ensure these key names (temperature, humidity) match what your backend expects!
    const payload = {
        temperature: parseFloat(temp),
        humidity: parseFloat(hum),
        sensorId: "SIMULATOR_001" // Added ID just in case backend needs it
    };

    // 3. PUSH to Server
    axios.post(SERVER_URL, payload)
        .then(res => {
            console.log(`[SENT] T:${temp}°C  H:${hum}%  -> Server Response: ${res.status}`);
        })
        .catch(err => {
            console.error(`[ERROR] Failed to connect to ${SERVER_URL}`);
            // Show specific error info if available
            if (err.response) {
                console.error(`Server responded with: ${err.response.status} ${err.response.statusText}`);
            } else {
                console.error(err.message);
            }
        });
}

// ---------------------------------------------------------
// TIMING CONFIGURATION
// ---------------------------------------------------------

// TEST MODE (Faster) - Runs every 5 seconds so you can verify it works quickly
setInterval(pushData, 5000); 

// REAL MODE (Production) - Runs every 1 minute (Uncomment this when done testing)
// setInterval(pushData, 60000); 

// Run once immediately so we don't have to wait for the first timer
pushData();