// ---------------------------------------------------------
// VIRTUAL ESP32 SIMULATOR
// ---------------------------------------------------------
// 1. Install Axios first: npm install axios
// 2. Run this script:     node src/simulate_esp32.js
// ---------------------------------------------------------

const axios = require('axios'); 

// TARGET: Your local backend server
const SERVER_URL = "http://localhost:3000/api/update"; 

console.log("--- STARTING VIRTUAL ESP32 ---");
console.log(`Target: ${SERVER_URL}`);

function pushData() {
    // 1. Generate Fake Data (Random fluctuation)
    // Temp: 37.0 - 38.0 | Humidity: 60.0 - 65.0
    const temp = (37 + Math.random()).toFixed(1);
    const hum = (60 + Math.random() * 5).toFixed(1);

    // 2. Prepare JSON payload
    const payload = {
        temperature: parseFloat(temp),
        humidity: parseFloat(hum)
    };

    // 3. PUSH to Server
    axios.post(SERVER_URL, payload)
        .then(res => {
            console.log(`[SENT] T:${temp}°C  H:${hum}%  -> Server: ${res.data.message}`);
        })
        .catch(err => {
            console.error("[ERROR] Could not reach server. Is 'npm run dev' running?");
        });
}

// ---------------------------------------------------------
// TIMING CONFIGURATION
// ---------------------------------------------------------

// OPTION A: FAST MODE (For Testing) - Runs every 5 seconds
// setInterval(pushData, 5000); 

// OPTION B: REAL MODE (For Production) - Runs every 1 minute
setInterval(pushData, 60000); 

// Run once immediately so we don't have to wait
pushData();