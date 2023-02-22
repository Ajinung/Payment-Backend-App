import mongoose, { model, Document, Schema } from "mongoose";
import { userData } from "../AllInterfaces/Allinterface";

interface mainData extends userData, Document {}

const userSchema = new Schema<userData>(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    accountNumber: {
      type: Number,
    },
    veified: {
      type: Boolean,
    },
    wallet: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "wallets",
      },
    ],
    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "history",
      },
    ],
  },
  { timestamps: true }
);

export default model<mainData>("userSchema", userSchema);
