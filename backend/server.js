const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Routes = require('./routes/index');
// Loading environment variables from a .env file
require('dotenv').config(); 

const app = express();  // Initialize an Express application

// Connect to the database
connectDB(); 


// Middleware setup
app.use(cors());// Allows cross-origin requests
app.use(express.json());// Middleware to parse incoming JSON requests

Routes(app);
const PORT = parseInt(process.env.PORT) || 5000;// Fetches the port from .env or defaults to 5000

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);// Logs a message when the server starts successfully
});
