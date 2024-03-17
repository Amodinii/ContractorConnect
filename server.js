const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/RegistrationDetails', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Model
const Companyuser = mongoose.model('Companyuser', new mongoose.Schema({
  CompanyName: String,
  WebsiteLink: String,
  PhoneNumber: String,
  AlternatePhoneNumber: String,
  Address: String,
  City: String,
  State: String,
  Password: String,
  ConfirmPassword: String,
  Email: String // Email field
}));

const Contractoruser = mongoose.model('Contractoruser', new mongoose.Schema({
  ContractorName: String,
  LicenceNumber: String,
  PhoneNumber: String,
  Address: String,
  City: String,
  State: String,
  Password: String,
  ConfirmPassword: String,
  Email: String // Email field 
}));

// Routes

// Initial registration route- email and usertype
app.post('/register', async (req, res) => {
  try {
    const { email, userType } = req.body;
    
    // Store the email and user type in the database 
    
    res.status(200).send({ message: "Email and user type stored successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// Company registration route
app.post('/companyRegister', async (req, res) => {
  try {
    const { Email, ...companyData } = req.body; // Extract email from request body
    const companyUser = new Companyuser({ ...companyData, Email: Email }); // Include email in user data
    await companyUser.save();
    res.status(201).send({ message: "Company User registered successfully", companyUser });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Contractor registration route
app.post('/contractorRegister', async (req, res) => {
  try {
    const { Email, ...contractorData } = req.body; // Extract email from request body
    const contractorUser = new Contractoruser({ ...contractorData, Email: Email }); // Include email in user data
    await contractorUser.save();
    res.status(201).send({ message: "Contractor registered successfully", contractorUser});
  }
  catch(error) {
    res.status(400).send(error);
  }
});

// Sign-in route
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in either collection
    const companyUser = await Companyuser.findOne({ Email: email, Password: password }).exec();
    const contractorUser = await Contractoruser.findOne({ Email: email, Password: password }).exec();

    if (companyUser) {
      res.status(200).send({ message: "Company User signed in successfully", user: companyUser });
    } else if (contractorUser) {
      res.status(200).send({ message: "Contractor signed in successfully", user: contractorUser });
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
