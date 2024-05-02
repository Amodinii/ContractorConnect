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

router.get("/userdetails", async (req, res) => {
  console.log("Hello Guyzz");
  try {
    // Fetch all documents from the collection
    const documents = await ContractorUser.find();
    res.json(documents); // Send the documents as JSON response
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get(
  "/vendordetails",
  verifyToken,
  authorizeContractor,
  async (req, res) => {
    console.log("We are getting vendor details");
    try {
      console.log(req.user.userId);
      const user = await ContractorUser.findById(req.user.userId); // Assuming req.user.id contains the user's ID after authentication
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Extract necessary user details and send as response
      res.json({
        id: user._id,
        CompanyName: user.ContractorName,
        companyphone: user.PhoneNumber,
        companystate: user.State,
        companyaddress: user.Address,
        companymail: user.Email,
      });
    } catch (err) {
      console.error("Error fetching user details:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.post(
  "/updateuserdetails",
  verifyToken,
  authorizeContractor,
  async (req, res) => {
    const profileId = req.user.userId;
    console.log(profileId);
    console.log("Updation route is getting hit");
    const updatedValues = req.body;
    console.log(updatedValues);
    try {
      // Update the profile using the CompanyUser model
      const updatedUser = await ContractorUser.findByIdAndUpdate(
        { _id: profileId },
        updatedValues
      );

      if (updatedUser) {
        res.status(200).send("Profile updated successfully");
      } else {
        res.status(404).send("Profile not found");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
