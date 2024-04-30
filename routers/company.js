// routers/company.js
import { Router } from "express";
import { CompanyUser } from "../models/companyUser.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeCompany } from "../middlewares/roleCheck.js";

const router = Router();

// Route to get all users (only accessible by company users)
router.get("/allUsers", verifyToken, authorizeCompany, async (req, res) => {
  try {
    const companies = await CompanyUser.find().exec();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// Route to get tenders by company ID
router.get(
  "/tenders/:companyId",
  verifyToken,
  authorizeCompany,
  async (req, res) => {
    try {
      const companyTenders = await Tender.find({
        company: req.params.companyId,
      }).exec();
      res.status(200).json(companyTenders);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

export default router;
