// router/tender.js
import { Router } from "express";
import upload from "../utils/storage.js";
import { Tender } from "../models/tender.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeCompany } from "../middlewares/roleCheck.js";
import { CompanyUser } from "../models/companyUser.js";

const router = Router();

// Route for posting tender with file upload
router.post(
  "/postTender",
  verifyToken,
  authorizeCompany,
  upload.single("tenderFile"),
  async (req, res) => {
    try {
      const { title, description, category } = req.body;
      const userId = req.user.userId; // Extract user ID from the authenticated request

      // Get the filename of the uploaded file
      const file = req.file;
      const fileName = file ? file.filename : null;
      if (!file) res.status(400).send({ message: "Tender file missing" });

      // Save the tender details in the database, associated with the authenticated company user
      const tender = new Tender({
        company: userId, // Associate tender with company user
        title: fileName,
        description: description,
        category: category,
      });

      await tender.save();
      const user = await CompanyUser.findById(req.user.userId);
      user.tenders.push(tender._id);
      await user.save();
      res.status(201).send({ message: "Tender posted successfully", tender });
    } catch (error) {
      console.error("Error posting tender:", error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

router.get("/tender/quotations/:tenderId", async (req, res) => {
  try {
    const tenderQuotations = await Quotation.find({
      tender: req.params.tenderId,
    }).exec();
    res.status(200).json(tenderQuotations);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.put("/tender/quotations/:quotationId", async (req, res) => {
  try {
    const { status } = req.body;
    await Quotation.findByIdAndUpdate(req.params.quotationId, {
      status: status,
    }).exec();
    res.status(200).send({ message: "Quotation status updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.put("/tender/:tenderId", async (req, res) => {
  try {
    const { status } = req.body;
    await Tender.findByIdAndUpdate(req.params.tenderId, {
      status: status,
    }).exec();
    res.status(200).send({ message: "Tender status updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get('/data', async (req, res) => {
  console.log("Hello Mihir");
  try {
      // Fetch all documents from the collection
      const documents = await Tender.find();
      res.json(documents); // Send the documents as JSON response
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
  }
});
export default router;
