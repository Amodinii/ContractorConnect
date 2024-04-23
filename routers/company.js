import { Router } from "express";

import { CompanyUser } from "../models/companyUser.js";

const router = Router();
router.get("/allUsers", async (req, res) => {
  try {
    const companies = await CompanyUser.find().exec();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/tenders/:companyId", async (req, res) => {
  try {
    const companyTenders = await Tender.find({
      company: req.params.companyId,
    }).exec();
    res.status(200).json(companyTenders);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
