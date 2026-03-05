// Simple Express backend for contact form
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Configure your email transport (use your real credentials in production)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lindokuhlenkosinathijali@gmail.com', // your email
        pass: 'YOUR_APP_PASSWORD' // use an app password, not your real password
    }
});

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        await transporter.sendMail({
            from: email,
            to: 'lindokuhlenkosinathijali@gmail.com',
            subject: `Portfolio Contact Form: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to send email.' });
    }
});

app.listen(PORT, () => {
    console.log(`Contact backend running on http://localhost:${PORT}`);
});
