const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Use environment variables for sensitive information
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

const connectDB = async() => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// Add error handling for async function
connectDB().catch(error => console.log(error));

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

// Define a MongoDB schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: Date,
  gender: {
    type: String,
    enum: ['male', 'female'], 
    required: true,
  },
  number: {
    type: String,
    required: true,
  }, 
  address: String
});

const User = mongoose.model('User', userSchema, 'patient info');

// Serve a simple HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '../dist/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
  // Create a new user object based on the form data
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    date: req.body.date,
    gender: req.body.gender,
    number: req.body.number,
    address: req.body.address
  });

  // Save the new user to the database
  newUser.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error saving to database: ${err.message}`);
    } else {
      res.send('Form submitted successfully!');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




/*
const patientName = document.querySelector('#name')
const patientNumber = document.querySelector('#number')
const patientAddress = document.querySelector('#address')
const patientDate = document.querySelector('#date')
const patientEmail = document.querySelector('#email')
const patientSubmit = document.querySelector('#patient-submit')
const patientMale = document.querySelector('#male')
const patientFemale = document.querySelector('#female')
*/
