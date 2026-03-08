const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const LOG_FILE = path.join(__dirname, 'submissions.log');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission
app.post('/submit', (req, res) => {
    const { userData } = req.body;
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] Data: ${userData}
`;

    // Append submission to the log file
    fs.appendFile(LOG_FILE, logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
            return res.status(500).send('An error occurred. Please try again later.');
        }
        console.log(`Confirmation received: ${userData}`);
        res.send('<h1>Thank you!</h1><p>Your transaction has been confirmed.</p><a href="/">Go Back</a>');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
