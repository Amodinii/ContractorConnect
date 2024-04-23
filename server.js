import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import * as crypto from "node:crypto";

import authRouter from "./routers/auth.js";
import companyRouter from "./routers/company.js";
import contractorRouter from "./routers/contractors.js";
import quotationRouter from "./routers/quotation.js";
import tenderRouter from "./routers/tender.js";
import userRouter from "./routers/users.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// MongoDB Connection

connect("mongodb://localhost:27017/ContractorConnect", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//Generating a secret key to keep a teack of user id.
const secretKey = crypto.randomBytes(32).toString("hex");

app.use("/auth", authRouter);
app.use("/company", companyRouter);
app.use("/contractor", contractorRouter);
app.use("/quotation", quotationRouter);
app.use("/tender", tenderRouter);
app.use("/users", userRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
