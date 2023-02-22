import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./Routes/user.route";

const port = 6400;
const url = "mongodb://localhost/PaymentPiggyVestDB";
const app = express();

app.use(express.json()).use(cors()).use("/api", router);

app.get("/", (req, res) => {
  res.status(200).json({
    message: `api is ready for consumption`,
  });
});

mongoose.connect(url).then(() => {
  console.log(`database connection established`);
});

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
