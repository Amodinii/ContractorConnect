// routers/contractors.js
import { Router } from "express";
import { ContractorUser } from "../models/contractorUser.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeContractor } from "../middlewares/roleCheck.js";

const router = Router();

// Route to get all users (only accessible by contractor users)
router.get("/allUsers", verifyToken, authorizeContractor, async (req, res) => {
  try {
    const contractors = await ContractorUser.find().exec();
    res.status(200).json(contractors);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// Route to get tenders by contractor ID
router.get(
  "/tenders/:contractorId",
  verifyToken,
  authorizeContractor,
  async (req, res) => {
    try {
      const contractorTenders = await Tender.find({
        vendor: req.params.contractorId,
      }).exec();
      res.status(200).json(contractorTenders);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

router.get('/vendordetails',verifyToken, authorizeContractor, async (req, res) => {
  console.log("We are extracting the details");
  try {
    console.log(req.user.userId)
    const user = await ContractorUser.findById(req.user.userId); // Assuming req.user.id contains the user's ID after authentication
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Extract necessary user details and send as response
    res.json({
      CompanyName: user.ContractorName,
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
