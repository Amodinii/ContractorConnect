import { Schema, model } from "mongoose";

export const companyUserSchema = new Schema({
  CompanyName: String,
  WebsiteLink: String,
  PhoneNumber: String,
  AlternatePhoneNumber: String,
  Address: String,
  State: String,
  Password: String,
  Email: String, // Email field
  // Fields related to tenders
  tenders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tender",
    },
  ],
});

// Mongoose Middleware for hashing password before saving
companyUserSchema.pre("save", async function (next) {
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

export const CompanyUser = model("CompanyUser", companyUserSchema);
