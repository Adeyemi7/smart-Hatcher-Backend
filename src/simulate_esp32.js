// ---------------------------------------------------------
// VIRTUAL ESP32 SIMULATOR
// ---------------------------------------------------------
// 1. Ensure axios is installed: npm install axios
// 2. Run this script: node src/simulate_esp32.js
// ---------------------------------------------------------

const axios = require('axios'); 

// ✅ UPDATED: Points to your live Render backend
const SERVER_URL = "https://smart-hatcher-backend.onrender.com/api/sensor"; 

console.log("--- STARTING VIRTUAL ESP32 ---");
console.log(`Target: ${SERVER_URL}`);

function pushData() {
    // 1. Generate Fake Data
    // Temp: 37.0 - 38.0 | Humidity: 60.0 - 65.0
    const temp = (37 + Math.random()).toFixed(1);
    const hum = (60 + Math.random() * 5).toFixed(1);

    // 2. Prepare JSON payload
    const payload = {
        temperature: parseFloat(temp),
        humidity: parseFloat(hum),
        sensorId: "ESP32_SIMULATOR_001"
    };

    // 3. PUSH to Server
    axios.post(SERVER_URL, payload)
        .then(res => {
            // Success Log
            console.log(`✅ [SENT] T:${temp}°C  H:${hum}%  -> Server Response: ${res.status} OK`);
        })
        .catch(err => {
            // Error Log
            console.error(`❌ [ERROR] Failed to send data.`);
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx (like 404 or 500)
                console.error(`   Server replied: ${err.response.status} ${err.response.statusText}`);
                if (err.response.status === 404) {
                    console.error("   (This means the backend code with the '/api/sensor' route hasn't finished deploying to Render yet. Wait 2 mins!)");
                }
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error(`   ${err.message}`);
            }
        });
}

// ---------------------------------------------------------
// TIMING
// ---------------------------------------------------------

// Run every 5 seconds for testing
setInterval(pushData, 60000); 

// Run immediately on start
pushData();