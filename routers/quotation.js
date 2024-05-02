import { Router } from "express";
import { Tender } from "../models/tender.js";
import { Quotation } from "../models/quotation.js";
import upload from "../utils/quotstorage.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeContractor } from "../middlewares/roleCheck.js";
import { ContractorUser } from "../models/contractorUser.js";
const router = Router();

router.post(
  "/postquotation",
  verifyToken,
  authorizeContractor,
  upload.single("quotationFile"),
  async (req, res) => {
    console.log("quotssss");
    try {
      const { title } = req.body;
      const contractorId = req.user.userId;
      const file = req.file;
      const fileName = file ? file.filename : null;

      console.log(Tender.tenderId);
      const existingQuotation = await Quotation.findOne({ tender: req.body.tenderId, contractor: req.user.userId });


      if (existingQuotation) {
        // If a quotation already exists, return an error message to the client
        return res.status(400).send({ message: "A quotation already exists for this tender. No more quotations can be uploaded." });
      }
      if (!file) {
        // Throw an error if the file is missing
        throw new Error("Quotation file missing");
      }

      const quotation = new Quotation({
        contractor: contractorId,
        title: fileName,
        tender: req.body.tenderId
      });

      await quotation.save();
      //res.status(201).send({ message: "Quotation posted successfully", quotation });
      res.redirect("/Dashboard_Vendor/dash.html");
    } catch (error) {
      console.error("Error posting quotation:", error);
      // Send an error response here
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

router.get('/data', async (req, res) => {
  console.log("Hello Guyzz");
  try {
    // Fetch all documents from the collection
    const documents = await Quotation.find();
    res.json(documents); // Send the documents as JSON response
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/getquotations', verifyToken,  async (req, res) => {
  console.log("Getting Quotation Details");
  let quotations;
  await Quotation.find({}).then((data) => quotations = data);
  console.log(quotations);
  res.json(quotations);
});

export default router;
