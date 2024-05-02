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
      //res.status(201).send({ message: "Tender posted successfully", tender });
      res.redirect('/Dashboard_Company/samp.html');
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

router.get('/data', verifyToken, async (req, res) => {
  try {
      // Fetch all documents from the collection
      const documents = await Tender.find();
      res.json(documents); // Send the documents as JSON response
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
  }
});


router.get('/gettenders', verifyToken, async (req, res) => {
  console.log("Getting Tender Details");
  console.log(req.query.userId);
  let tenders;
  await Tender.find({}).then((data)=> tenders = data);
  console.log(tenders);
  res.json(tenders);
});

router.post('/updatestatus',verifyToken, async(req,res)=>{
  console.log("Updating the status of the tender");
  console.log(req.body);
  console.log(req.query.id);
  try {
    // Update the profile using the CompanyUser model
    const updatedUser = await Tender.findByIdAndUpdate(
        { _id: req.query.id }, 
        { $set: { status: req.body.status } }
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
})
export default router;
