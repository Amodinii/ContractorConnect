import { Router } from "express";
import { ContractorUser } from "../models/contractorUser.js";
import { Tender } from "../models/tender.js";

const router = Router();

router.get("/allUsers", async (req, res) => {
  try {
    const contractors = await ContractorUser.find().exec();
    res.status(200).json(contractors);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/tenders/:contractorId", async (req, res) => {
  try {
    const contractorTenders = await Tender.find({
      vendor: req.params.contractorId,
    }).exec();
    res.status(200).json(contractorTenders);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
