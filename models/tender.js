import { Schema, model } from "mongoose";

export const tenderSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "companyuserSchema",
  },
  title: String,
  description: String,
  category: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Open", "Closed", "Cancelled"],
    default: "Open",
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "contractoruserSchema",
  },
});

export const Tender = model("Tender", tenderSchema);
