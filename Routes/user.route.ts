import express from "express";
import {
  makeTransfer,
  RegisterUser,
  users,
} from "../controller/user.controller";

const router = express.Router();

router.route("/register").post(RegisterUser);
router.route("/transact/:userID/:WalletID").post(makeTransfer);
router.route("/users").get(users);

export default router;
