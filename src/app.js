// const express = require('express');
// const cors = require('cors');
// const sensorRoutes = require('./routes/sensorRoutes');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // 1. Middleware
// app.use(cors()); // Allow everyone (useful for development)
// app.use(express.json()); // Allow server to parse JSON bodies

// // 2. Routes
// // All routes in sensorRoutes will be prefixed with /api
// app.use('/api', sensorRoutes);

// // 3. Root check (just to see if server is running)
// app.get('/', (req, res) => {
//     res.send('Incubator Backend is Running!');
// });

// // 4. Start Server
// // "0.0.0.0" is important! It allows access from other devices on the network.
// app.listen(PORT, '0.0.0.0', () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
//     console.log(`📡 To access from phone, use your PC's IP address (e.g., http://192.168.x.x:${PORT})`);
// });


const express = require('express');
const cors = require('cors');
const sensorRoutes = require('./routes/sensorRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middleware
app.use(cors()); 
app.use(express.json()); 

// 2. Routes
app.use('/api', sensorRoutes);

// 3. Root check 
app.get('/', (req, res) => {
    res.send('Incubator Backend is Running!');
});

// 4. Start Server (THIS IS THE PART THAT KEEPS IT RUNNING)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 To access from phone, use your PC's IP address (e.g., http://10.228.226.224:${PORT})`);
});