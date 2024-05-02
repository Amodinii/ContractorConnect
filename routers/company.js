// routers/company.js
import { Router } from "express";
import { CompanyUser } from "../models/companyUser.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeCompany } from "../middlewares/roleCheck.js";

const router = Router();

// Route to get all users (only accessible by company users)
router.get("/allUsers", verifyToken, authorizeCompany, async (req, res) => {
  try {
    const companies = await CompanyUser.find().exec();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// Route to get tenders by company ID
router.get(
  "/tenders/:companyId",
  verifyToken,
  authorizeCompany,
  async (req, res) => {
    try {
      const companyTenders = await Tender.find({
        company: req.params.companyId,
      }).exec();
      res.status(200).json(companyTenders);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

router.get('/userdetails', async (req, res) => {
  console.log("Hello Guyzz");
  try {
      // Fetch all documents from the collection
      const documents = await CompanyUser.find();
      res.json(documents); // Send the documents as JSON response
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
  }
});

router.post('/userdetails', verifyToken, authorizeCompany, async (req, res) => {
  try {
    // Extract user data from request body
    const { CompanyName, WebsiteLink, PhoneNumber, AlternatePhoneNumber, Address, Email, State } = req.body;

    // Create a new CompanyUser document
    const newUser = new CompanyUser({
      CompanyName,
      WebsiteLink,
      PhoneNumber,
      AlternatePhoneNumber,
      Address,
      Email,
      State
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json(newUser);
  } catch (error) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error('Error creating company user:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/companydetails',verifyToken, authorizeCompany, async (req, res) => {
  console.log("Enter getting company details");
  try {
    const user = await CompanyUser.findById(req.user.userId); // Assuming req.user.id contains the user's ID after authentication
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Extract necessary user details and send as response
    console.log(user._id);
    res.json({
      id: user._id,
      CompanyName: user.CompanyName,
      companywebsite : user.WebsiteLink,
      companyphone : user.PhoneNumber,
      companystate : user.State,
      companyaddress : user.Address,
      companymail : user.Email,
      tenders:user.tenders,
    });
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/updateuserdetails', verifyToken, authorizeCompany, async (req, res) => {
  const profileId = req.user.userId; 
  console.log(profileId);
  console.log("Updation route is getting hit");
  const updatedValues = req.body;
  console.log(updatedValues);
  try {
      // Update the profile using the CompanyUser model
      const updatedUser = await CompanyUser.findByIdAndUpdate(
          { _id: profileId }, 
          updatedValues,
      );
      
      if (updatedUser) {
          res.status(200).send('Profile updated successfully');
      } else {
          res.status(404).send('Profile not found');
      }
  } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).send('Internal Server Error');
  }
});

router.get('/findcompany', async (req, res) => {
  console.log("Enter getting company details");
  try {
    console.log("ID jo aa raha hai", req.query.id);
    const user = await CompanyUser.findById(req.query.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      CompanyName: user.CompanyName,
      companywebsite: user.WebsiteLink,
      companyphone: user.PhoneNumber,
      companystate: user.State,
      companyaddress: user.Address,
      companymail: user.Email,
    });
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
