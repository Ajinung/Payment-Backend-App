import { model, Document, Schema } from "mongoose";
import { historyData } from "../AllInterfaces/Allinterface";

interface mainData extends historyData, Document {}

const historySchema = new Schema<historyData>(
  {
    message: {
      type: String,
    },
    transactionType: {
      type: String,
    },
    transactionReference: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default model<mainData>("history", historySchema);
