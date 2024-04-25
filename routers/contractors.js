// routers/contractors.js
import { Router } from "express";
import { verifyToken, authorizeContractor } from "./auth.js";
import { ContractorUser } from "../models/contractorUser.js";

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

export default router;
