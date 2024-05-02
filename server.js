import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import { jwtSecretKey } from "./config.js";

import authRouter from "./routers/auth.js";
import companyRouter from "./routers/company.js";
import contractorRouter from "./routers/contractors.js";
import quotationRouter from "./routers/quotation.js";
import tenderRouter from "./routers/tender.js";
import userRouter from "./routers/users.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
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

// Routes
app.use("/auth", authRouter);
app.use("/company", companyRouter);
app.use("/contractors", contractorRouter);
app.use("/quotation", quotationRouter);
app.use("/tender", tenderRouter);
app.use("/users", userRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
