import { Router } from "express";

import upload from "../utils/storage.js";
import { Tender } from "../models/tender.js";
const router = Router();

// Route for posting tender with file upload
router.post("/postTender", upload.single("tenderFile"), async (req, res) => {
  console.log("Entered the tender posting");
  try {
    const { title, description, category } = req.body;

    // Get the filename of the uploaded file
    const file = req.file;
    const fileName = file ? file.filename : null;
    if (!file) res.status(400).send({ message: "Tender file missing" });

    // Save the tender details in the database
    const tender = new Tender({
      title: fileName,
      description: description,
      category: category,
    });

    await tender.save();
    res.status(201).send({ message: "Tender posted successfully", tender });
  } catch (error) {
    console.error("Error posting tender:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

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

export default router;