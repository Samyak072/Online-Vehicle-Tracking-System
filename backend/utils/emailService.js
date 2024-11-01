// backend/utils/emailService.js

const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
    },
});

/**
 * Sends an email.
 * 
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text body of the email.
 * @param {string} html - The HTML body of the email (optional).
 * @returns {Promise} - A promise that resolves when the email is sent.
 */
const sendEmail = (to, subject, text, html = '') => {
    const mailOptions = {
        from: process.env.EMAIL_FROM, // Sender address
        to, // Recipient address
        subject, // Subject line
        text, // Plain text body
        html, // HTML body
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendEmail,
};

