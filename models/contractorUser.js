import { Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";

export const contractorUserSchema = new Schema({
  ContractorName: String,
  LicenceNumber: String,
  PhoneNumber: String,
  Address: String,
  City: String,
  State: String,
  Password: String,
  Email: String, // Email field
  quotations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quotation",
    },
  ],
});

// Mongoose middleware for data processing
contractorUserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("Password") || user.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.Password, salt);
      user.Password = hash;
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
});

export const ContractorUser = model("ContractorUser", contractorUserSchema);
