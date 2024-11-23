import jwt from "jsonwebtoken";
import Stripe from "stripe";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";

//GLOBAL VARIABLES
const currency = "usd";

//GET WAY INITIALIZE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user: { name: user.name } });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.json({ success: true, token, user: { name: user.name } });
    } else {
      return res.json({ success: false, message: "Incorrect password." });
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

export const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

export const userPayment = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const { origin } = req.headers;

    if (!userId || !planId) {
      return res.json({ success: false, message: "Missing Details" });
    }

    let credits, plan, amount, date;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;

      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;

      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;

      default:
        return res.json({ success: false, message: "Plan not found!" });
    }

    date = new Date();

    const transactionData = {
      userId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = new transactionModel(transactionData);
    await newTransaction.save();

    const line_items = [
      {
        price_data: {
          currency: currency,
          product_data: {
            name: newTransaction.plan,
          },
          unit_amount: newTransaction.amount * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&transactionId=${newTransaction._id}`,
      cancel_url: `${origin}/verify?success=false&transactionId=${newTransaction._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

export const verifyStripe = async (req, res) => {
  const { transactionId, success, userId } = req.body;

  try {
    if (success === "true") {
      const transactionData = await transactionModel.findById(transactionId);
      const user = await userModel.findById(userId);

      const creditBalance = user.creditBalance + transactionData.credits;
      await userModel.findByIdAndUpdate(userId, { creditBalance });

      await transactionModel.findByIdAndUpdate(transactionId, {
        payment: true,
      });

      res.json({ success: true, message: "Credit Added" });
    } else {
      res.json({ success: false, message: "Payment Failed!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
