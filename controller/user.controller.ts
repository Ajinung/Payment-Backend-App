import { Request, Response } from "express";
import userModel from "../Model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import walletModel from "../Model/wallet.model";
import mongoose from "mongoose";
import historyModel from "../Model/history.model";

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, userName, phoneNumber } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const dater = Date.now();

    const generateNumber = Math.floor(Math.random() * 78) + dater;

    const regUser = await userModel.create({
      name,
      email,
      password: hash,
      userName,
      phoneNumber: `234${phoneNumber}`,
      verified: true,
      accountNumber: generateNumber,
    });

    const newWallet = await walletModel.create({
      _id: regUser?._id,
      balance: 1000,
      credit: 0,
      debit: 0,
    });

    regUser?.wallet.push(new mongoose.Types.ObjectId(newWallet?._id));

    regUser.save();

    res.status(200).json({
      message: `Success creating account`,
      data: regUser,
      token: jwt.sign({ _id: regUser._id }, "dgdgd-juj3445-bjdjhdsj7-hsdhj6"),
    });
  } catch (error) {
    return res.status(400).json({
      message: `an error occurred while registering`,
    });
  }
};

//transfer to another wallet
export const makeTransfer = async (req: Request, res: Response) => {
  try {
    const { accountNumber, amount } = req.body;

    //create transaction reference
    const refNumber = Math.floor(Math.random() * 70) * 4564;

    //Receiver Account
    const getReciver = await userModel.findOne({ accountNumber });
    const getReciverWallet = await walletModel.findById(getReciver?._id);

    //Sender Account
    const getUser = await userModel.findById(req.params.userID);
    const getUserWallet = await walletModel.findById(req.params.WalletID);

    //check if there is a user and a receiver account
    if (getUser && getReciver) {
      //check if sender has enough funds to send
      if (amount > getUserWallet?.balance!) {
        return res.status(400).json({
          message: "insufficient funds",
        });
      } else {
        //updating the sender wallet

        await walletModel.findByIdAndUpdate(getUserWallet?._id, {
          balance: getUserWallet?.balance! - amount,
          credit: 0,
          debit: amount,
        });

        //create senders transaction history
        const createHistorySender = await historyModel.create({
          message: `you have sent ${amount} to ${getReciver?.name}`,
          transactionType: "debit",
          transactionReference: refNumber,
        });

        getUser?.history?.push(
          new mongoose.Types.ObjectId(createHistorySender?.id)
        );
        getUser.save();

        //updating Receivers wallet
        await walletModel.findByIdAndUpdate(getReciverWallet?._id, {
          balance: getReciverWallet?.balance + amount,
          credit: amount,
          debit: 0,
        });

        //create receiver transaction transaction history
        const createReceiverHistory = await historyModel.create({
          message: `Your account has been credited with ${amount} from ${getUser}`,
          transactionType: "credit",
          transactionReference: refNumber,
        });

        getReciver?.history.push(
          new mongoose.Types.ObjectId(createReceiverHistory?._id)
        );
        getReciver?.save();
      }
      return res.status(200).json({
        message: `transaction successful`,
      });
    } else {
      return res.status(400).json({
        message: "user not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: `an error occurred while making transfer`,
    });
  }
};

export const users = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();

    return res.status(200).json({
      message: `data gotten`,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: `an error occurred`,
    });
  }
};
