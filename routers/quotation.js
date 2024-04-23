import { Router } from "express";
import { Quotation } from "../models/quotation.js";

const router = Router();

// Handle quotation submission route
router.post("/submitQuotation", async (req, res) => {
  try {
    const { tender_id, contractor_id } = req.body;
    const quotation = new Quotation({
      tender: tender_id,
      contractor: contractor_id,
    });
    await quotation.save();
    res
      .status(201)
      .send({ message: "Quotation submitted successfully", quotation });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
