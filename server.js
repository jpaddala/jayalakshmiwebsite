const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',    // Your MySQL host (e.g., localhost)
  user: 'root',         // Your MySQL username
  password: 'Apple_12032002', // Your MySQL password
  database: 'customer_data'  // Your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Serve static files (CSS, JavaScript, images, etc.)
app.use(express.static(path.join(__dirname)));

// Endpoint to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Homepage.html')); // Adjust if your HTML file has a different name
});

// Endpoint to handle form data
app.post('/submit_quote', (req, res) => {
  console.log("#########################################");
  console.log("request", req.body);
  console.log("#########################################");
  const { name, email, phone, city, pincode, service, HP, quantity, message } = req.body;

  // Validate input data
  if (!name || !email || !message) {
    return res.status(400).send('All fields are required.');
  }

  // Insert form data into MySQL database (in 'customers' table)
  const sql = 'INSERT INTO customers (name, email, phone, city, pincode, service, quantity, message, HP) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [name, email, phone, city, pincode, service, quantity, message, HP];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).send('Error saving data');
    }

    console.log('Data saved to MySQL:', result);

    // Set up nodemailer to send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jayalakshmi.pumps@gmail.com', // Your email
        pass: 'skcx dglg fejk omyu' // Use an app password if 2FA is enabled
      }
    });

    const mailOptions = {
      from: 'jayalakshmi.pumps@gmail.com', // Sender's email
      to: email, // Recipient's email
      subject: 'Quotation Received',
      text: `Dear ${name},\n\nThank you for your inquiry on ${service}\nQuantity: ${quantity} . We will get back to you soon.\n\nMessage: ${message}`
    };



    // Email to the owner
    const ownerMailOptions = {
      from: 'jayalakshmi.pumps@gmail.com',
      to: 'jayalakshmiengg5@gmail.com', // Replace this with the owner's email address
      subject: 'New Quote Request Received',
      text: `A new quote request has been submitted.\n\nCustomer Name: ${name}\nCustomer Email: ${email}\nRaised a quote on the ${service}\nQuantity: ${quantity}\nMessage: ${message}`
    };

    // Send email for customer.
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error occurred:', error); // Log the error for debugging
        return res.status(500).send('Error in sending email');
      } else {
        console.log('Email sent:', info.response); // Log the success message
        res.send('Data saved and email sent');
      }
    });
    //send email for owner
    transporter.sendMail(ownerMailOptions, (error, info) => {
      if (error) {
        console.error('Error occurred:', error); // Log the error for debugging
        return res.status(500).send('Error in sending email');
      } else {
        console.log('Email sent:', info.response); // Log the success message
        res.send('Data saved and email sent');
      }
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
