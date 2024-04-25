import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";

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

// Secret key for JWT token
const secretKey = "your_secret_key";

// JWT middleware to authenticate requests
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Routes
app.use("/auth", authRouter);
app.use("/company", authenticateToken, companyRouter);
app.use("/contractor", authenticateToken, contractorRouter);
app.use("/quotation", authenticateToken, quotationRouter);
app.use("/tender", authenticateToken, tenderRouter);
app.use("/users", authenticateToken, userRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
