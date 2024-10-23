const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = 8080;

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors()); // Allow CORS for all origins
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(express.json()); // Parse JSON bodies

// Endpoint to handle form submissions
app.post('/submit-appointment', async (req, res) => {
    const { firstName, lastName, dob, phone, email, examType, concerns, links } = req.body;

    // Insert data into Supabase
    const { data, error } = await supabase
        .from('appointments') // Make sure this matches your table name
        .insert([
            { 
                first_name: firstName, // Updated to snake_case
                last_name: lastName,    // Updated to snake_case
                dob: dob,               // This should match the DATE format (e.g., YYYY-MM-DD)
                phone: phone,           // Matches
                email: email,           // Matches
                exam_type: examType,    // Updated to snake_case
                concerns: concerns,     // Matches
                links: links            // Matches
            }
        ]);

    if (error) {
        console.error('Error inserting data:', error);
        return res.status(400).json({ error: 'Failed to submit appointment' });
    }

    res.status(200).json({ message: 'Appointment submitted successfully', data });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
