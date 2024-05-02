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

<<<<<<< HEAD
/* 
main pending work flow-

1) make a route to get the posted tenders to the vendors dashboard
prefarably, we have to give an option to the vendor to choose his category to display those tenders matching that particular category
so we need to add another field called category in the vendor's page; depending on the category he selects, tenders will be displayed
 accordingly in his page; and the tenders displayed on his page 

 2) in the home page, when the user clicks on the find tenders, he will be able to view the tenders of that particular category(2 options
  either assign the category and fix it or make it dynamic, user can select and view any tenders of category he selects)

 3) now beside each tender we give view tender option- he will be able to view the tender, interested/not interested option
  upon clicking on interested, user will be prompted to submit a quotation document
  upon clicking on not interested, the particular tender vanishes/gets hidden/nothing really happens

  4) after quotation submission, this quotation forwards and routes to the company person who posted that particular tender

  5) now in the company page, person will be able to view the list of interested vendors for the tender he has posted; among these,
  he will accept/reject the vendors

  6) upon accept, vendor recieves a notification of his contract success/approval and contract is sealed
    upon reject, vendor recieves a notification of his contract rejecton
    by default, in the notifs page, the status of a particular tender-quotation for the vendor's perspective is pending..

  7) assigning roles and access control, admin 

  small parts of work- profile page rendering and connecting backend route(already ready) with frontend(company side); profile needs
  to be shown on contractor side as well;
  displaying tenders on the company page below(again chota kaam; already post tender and displaying them via urls is all ready; 
    just connect to frontend dashboard)

*/

=======
router.get('/data', async (req, res) => {
  console.log("Hello Guyzz");
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
