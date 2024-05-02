import { Schema, model } from "mongoose";

export const quotationSchema = new Schema({
  tender: {
    type: Schema.Types.ObjectId,
    ref: "Tender",
  },
  contractor: {
    type: Schema.Types.ObjectId,
    ref: "contractorUser",
  },
  submitted_at: {
    type: Date,
    default: Date.now,
  },
  title: String,
  status: {
    type: String,
    enum: ["Accepted", "Rejected", "Pending"],
    default: "Pending",
  },
});

export const Quotation = model("Quotation", quotationSchema);
