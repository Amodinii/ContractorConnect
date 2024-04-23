import { Schema, model } from "mongoose";

export const quotationSchema = new Schema({
  tender: {
    type: Schema.Types.ObjectId,
    ref: "Tender",
  },
  contractor: {
    type: Schema.Types.ObjectId,
    ref: "Contractoruser",
  },
  submitted_at: {
    type: Date,
    default: Date.now,
  },
});

export const Quotation = model("Quotation", quotationSchema);
