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
    const { Full_name, Gender, Age, Smoking_status, Diabetes_type, Concerns, Document_links, Phone_number, Email, Previous_surgery_date} = req.body;

    // Insert data into Supabase
    const { data, error } = await supabase
        .from('appointmentform') // name matching with my DB
        .insert([
            { 
                full_name: Full_name,
                gender: Gender,
                age: Age,
                smoking_status: Smoking_status,
                diabetes_type: Diabetes_type,
                concerns: Concerns,
                document_links: Document_links,
                phone_number: Phone_number,
                email: Email,
                previous_surgery_date: Previous_surgery_date,
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
