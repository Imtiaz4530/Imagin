import express from "express";
import {
  loginUser,
  registerUser,
  userCredits,
  userPayment,
  verifyStripe,
} from "../controllers/userController.js";
import userAuth from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/credits", userAuth, userCredits);
userRouter.post("/pay-stripe", userAuth, userPayment);
userRouter.post("/verifystripe", userAuth, verifyStripe);

export default userRouter;