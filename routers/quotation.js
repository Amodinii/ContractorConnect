import { Router } from "express";
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
    console.log("This is in quotation posting route");
    try {
      const { title, tender_id, contractor_id } = req.body;
      const userId = req.user.userId; // Extract user ID from the authenticated request

      // Get the filename of the uploaded file
      const file = req.file;
      const fileName = file ? file.filename : null;
      if (!file) res.status(400).send({ message: "Tender file missing" });

      // Save the tender details in the database, associated with the authenticated company user
      const quotation = new Quotation({
        title: fileName,
        tender: tender_id,
        contractor: contractor_id,
      });

      await quotation.save();
      const user = await ContractorUser.findById(req.user.userId);
      user.quotation.push(quotation._id);
      await user.save();
      res.status(201).send({ message: "Quotation posted successfully", quotation });
    } catch (error) {
      console.error("Error posting tender:", error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

export default router;
