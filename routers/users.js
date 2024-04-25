import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { ContractorUser } from "../models/contractorUser.js";
import { CompanyUser } from "../models/companyUser.js";

const router = Router();

//getting the profile data from the database.
router.get("/profile", verifyToken, async (req, res) => {
  try {
    let user = null;
    if (req.user.userType === "contractor")
      user = await ContractorUser.findById(req.user.userId);
    else user = await CompanyUser.findById(req.user.userId);

    res.status(200).json(user);

    // Check if the user exists
  } catch (err) {
    console.log("Error: ", err);
    res.status(400).send({ message: "Oops :-( Something went wrong!" });
  }
});

export default router;
