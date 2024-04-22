const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const session = require('express-session');
const multer = require('multer');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/RegistrationDetails', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Schema definitions for Companyuser and Contractoruser
const companyUserSchema = new mongoose.Schema({
  CompanyName: String,
  WebsiteLink: String,
  PhoneNumber: String,
  AlternatePhoneNumber: String,
  Address: String,
  State: String,
  Password: String,
  Email: String, // Email field
  // Fields related to tenders
  tenders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tender'
  }]
});

const contractorUserSchema = new mongoose.Schema({
  ContractorName: String,
  LicenceNumber: String,
  PhoneNumber: String,
  Address: String,
  City: String,
  State: String,
  Password: String,
  Email: String, // Email field 
  tenders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tender'
  }]
});

const tenderSchema = new mongoose.Schema({
  /*company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Companyuser'
  },*/
  title: String,
  description: String,
  category: String,
  /*created_at: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'Cancelled'],
    default: 'Open'
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contractoruser'
  }*/
});

const quotationSchema = new mongoose.Schema({
  tender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tender'
  },
  contractor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contractoruser'
  },
  submitted_at: {
    type: Date,
    default: Date.now
  }
});

//Generating a secret key to keep a teack of user id.
const secretKey = crypto.randomBytes(32).toString('hex');

// Add session middleware
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true
}));
// Middleware for hashing password before saving
companyUserSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("Password") || user.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.Password, salt);
      user.Password = hash;
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
});

contractorUserSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("Password") || user.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.Password, salt);
      user.Password = hash;
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
});

// Models based on the schemas
const Companyuser = mongoose.model('Companyuser', companyUserSchema);
const Contractoruser = mongoose.model('Contractoruser', contractorUserSchema);
const Tender = mongoose.model('Tender', tenderSchema);
const Quotation = mongoose.model('Quotation', quotationSchema);

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
    req.session.userId = companyUser._id;
    console.log(req.session.userId);
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
    req.session.userId = contractorUser._id;
    console.log(req.session.userId);
    res.status(201).send({ message: "Contractor registered successfully", contractorUser});
  }
  catch(error) {
    res.status(400).send(error);
  }
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination directory for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original filename
  }
});

// Create multer middleware instance
const upload = multer({ storage: storage });

// Route for posting tender with file upload
app.post('/postTender', upload.single('file'), async (req, res) => {
  try {
    // Your route handler logic here
    // Ensure that 'upload' variable is properly accessible in this scope
  } catch (error) {
    console.error("Error posting tender:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Handle quotation submission route
app.post('/submitQuotation', async (req, res) => {
  try {
    const { tender_id, contractor_id } = req.body;
    const quotation = new Quotation({
      tender: tender_id,
      contractor: contractor_id
    });
    await quotation.save();
    res.status(201).send({ message: "Quotation submitted successfully", quotation });
  } catch (error) {
    res.status(400).send(error);
  }
});

// fetching profile details

/*app.get('/companyProfilePage', async (req, res) => {

})

app.get('/contractorProfilePage', async (req, res) => {

})*/

// Sign-in route
// Sign-in route
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user;
    // Check if the user exists in either collection
    const companyUser = await Companyuser.findOne({ Email: email }).exec();
    const contractorUser = await Contractoruser.findOne({ Email: email }).exec();

    if (companyUser && await bcrypt.compare(password, companyUser.Password)) {
      // Store user ID in session object
      req.session.userId = companyUser._id; // Assigning companyUser's ID
      console.log(req.session.userId);
      res.status(200).send({ message: "Company User signed in successfully", userType: "Company" });
    } else if (contractorUser && await bcrypt.compare(password, contractorUser.Password)) {
      // Store user ID in session object
      req.session.userId = contractorUser._id; // Assigning contractorUser's ID
      console.log(req.session.userId);
      res.status(200).send({ message: "Contractor signed in successfully", userType: "Contractor" });
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});


app.get('/companies', async(req,res)=>{
  try{
    const companies = await Companyuser.find().exec();
    res.status(200).json(companies);
  }
  catch(error){
    res.status(500).send({message: "Internal server error"});
  }
});

app.get('/contractors', async(req,res)=> {
  try{
    const contractors = await Contractoruser.find().exec();
    res.status(200).json(contractors);
  }
  catch(error){
    res.status(500).send({message: "Internal server error"});
  }
});

app.get('/company/tenders/:companyId', async (req, res) => {
  try {
    const companyTenders = await Tender.find({ company: req.params.companyId }).exec();
    res.status(200).json(companyTenders);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

app.get('/tender/quotations/:tenderId', async (req, res) => {
  try {
    const tenderQuotations = await Quotation.find({ tender: req.params.tenderId }).exec();
    res.status(200).json(tenderQuotations);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

app.put('/tender/quotations/:quotationId', async (req, res) => {
  try {
    const { status } = req.body;
    await Quotation.findByIdAndUpdate(req.params.quotationId, { status: status }).exec();
    res.status(200).send({ message: "Quotation status updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

app.put('/tender/:tenderId', async (req, res) => {
  try {
    const { status } = req.body;
    await Tender.findByIdAndUpdate(req.params.tenderId, { status: status }).exec();
    res.status(200).send({ message: "Tender status updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

app.get('/contractor/tenders/:contractorId', async (req, res) => {
  try {
    const contractorTenders = await Tender.find({ vendor: req.params.contractorId }).exec();
    res.status(200).json(contractorTenders);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

//getting the profile data from the database.
app.get('/profile', async (req, res) => {
  try {
    // Retrieve the user ID from the session
    const userId = req.session.userId;

    // Query the database to find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (user) {
      //printing to see if the details will be retrieved or not
      console.log("User details:", user);
      
      // If the user exists, render the profile page with the user data
      res.render('ProfilePage', { user });
    } else {
      // If the user doesn't exist, handle the error accordingly
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error fetching user data:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));