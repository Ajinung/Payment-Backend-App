import mongoose, { model, Document, Schema } from "mongoose";
import { walletData } from "../AllInterfaces/Allinterface";

interface mainData extends walletData, Document {}

const walletSchema = new Schema<walletData>(
  {
    balance: {
      type: Number,
    },
    credit: {
      type: Number,
    },
    debit: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default model<mainData>("wallets", walletSchema);
