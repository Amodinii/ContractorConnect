import { Router } from "express";
import { CompanyUser } from "../models/companyUser.js";
import { ContractorUser } from "../models/contractorUser.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../config.js";

const router = Router();

//function to generate jwt token

function generateToken(userId, userType) {
  return jwt.sign({ userId, userType }, jwtSecretKey, { expiresIn: "1h" });
}

// Company registration route
router.post("/companyRegister", async (req, res) => {
  console.log("route");
  try {
    const { Email, ...companyData } = req.body; // Extract email from request body
    const companyUser = new CompanyUser({ ...companyData, Email: Email }); // Include email in user data
    await companyUser.save();
    //req.session.userId = companyUser._id;
    //console.log(req.session.userId);
    res
      .status(201)
      .send({ message: "Company User registered successfully", companyUser });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Contractor registration route
router.post("/contractorRegister", async (req, res) => {
  console.log("hello");
  try {
    const { Email, ...contractorData } = req.body; // Extract email from request body
    const contractorUser = new ContractorUser({
      ...contractorData,
      Email: Email,
    }); // Include email in user data
    await contractorUser.save();
    // req.session.userId = contractorUser._id;
    // console.log(req.session.userId);
    res
      .status(201)
      .send({ message: "Contractor registered successfully", contractorUser });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

// Sign-in route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user;
    const companyUser = await CompanyUser.findOne({ Email: email }).exec();
    const contractorUser = await ContractorUser.findOne({
      Email: email,
    }).exec();

    const match = await bcrypt.compare(password, companyUser.Password);
    
    if (companyUser && match) {
      const token = generateToken(companyUser._id, "Company");
      const now = new Date();
      res.cookie("authorization", token, {
        expires: new Date(now.setDate(now.getDate() + 3)),
      });
      res.status(200).send({
        message: "Company User signed in successfully",
        userType: "Company",
      });
    } else if (
      contractorUser &&
      (await bcrypt.compare(password, contractorUser.Password))
    ) {
      const token = generateToken(contractorUser._id, "Contractor");
      res.cookie("authorization", token);
      res.status(200).send({
        message: "Contractor signed in successfully",
        userType: "Contractor",
      });
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
