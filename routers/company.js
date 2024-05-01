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

router.get('/userdetails',verifyToken, authorizeCompany, async (req, res) => {
  console.log("We are extracting the details");
  
  try {
    const user = await CompanyUser.findById(req.user.userId); // Assuming req.user.id contains the user's ID after authentication
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Extract necessary user details and send as response
    res.json({
      CompanyName: user.CompanyName,
      companywebsite : user.WebsiteLink,
      companyphone : user.PhoneNumber,
      companystate : user.State,
      companyaddress : user.Address,
      companymail : user.Email,
    });
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
