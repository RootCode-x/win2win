var axios = require('axios');
import { Exchange } from "@/lib/model/exchange"; 
import { User } from "@/lib/model/user"; 
import { connectToDb } from "@/lib/utils";
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await connectToDb(); 
  switch (req.method) {
    case "POST":
      return placeBet(req, res);
    case "PUT":
      return empty_method(req, res);
    case "DELETE":
      return empty_method(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}

async function placeBet(req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const {
      user_id,
      sport_name,
      sport_id,
      amount,
      exposure,
      match_name,
      match_id,
      round_name,
      round_id,
      size,
      odds,
      selection,
      back_lay,
      transation_id
    } = req.body;

    // Validate incoming data
    if (!user_id || !sport_name || !sport_id || !amount || !exposure || !match_name || !match_id || !round_name || !round_id || !odds || !selection || !back_lay || !transation_id) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields",
        errors: "Ensure all required fields are present in the request."
      });
    }

    // Parse numeric values from input
    const numericAmount   = parseFloat(amount);
    const numericExposure = parseFloat(exposure);

    if (isNaN(numericAmount) || isNaN(numericExposure)) {
      // return res.status(400).json({
      //   status: false,
      //   message: "Invalid amount or exposure",
      //   errors: "Amount and exposure should be valid numbers."
      // });
    }

    // Step 1: Check if the user exists
    const user_details = await User.findOne({ user_id: user_id }).session(session);
    
    if (!user_details) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        status: false,
        message: "User not found",
        errors: "User does not exist in the database."
      });
    }

    // Step 2: Check if the user has enough balance
    const userBalance = user_details.currency;

    if (userBalance < numericAmount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        status: false,
        message: "Insufficient balance",
        errors: `User balance (${userBalance}) is less than the required amount (${numericAmount}).`
      });
    }

    // Step 3: Deduct the bet amount from the user's balance
    const newBalance = userBalance - numericAmount;

    await User.updateOne(
      { user_id },
      { $set: { currency: newBalance } }
    ).session(session);

    // Step 4: Create a new exchange record
    const exchange = new Exchange({
      user_id,
      sport_name,
      sport_id,
      amount: numericAmount,
      exposure: numericExposure,
      match_name,
      match_id,
      round_name,
      round_id,
      size,
      odds,
      selection,
      back_lay,
      transation_id,
      status: 'pending' // Initial bet status is pending
    });

    await exchange.save({ session });

    // Step 5: Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Step 6: Send a success response
    return res.json({
      status: true,
      message: "Bet placed successfully",
      data: {
        balance: newBalance,
        user_id: user_id,
        transaction_id: transation_id
      },
      errors: ""
    });

  } catch (error) {
    // Rollback in case of errors during transaction
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      errors: error.message
    });
  }
}

// Fallback for unsupported methods
async function empty_method(req, res) {
  return res.status(405).json({
    status: false,
    message: "Method not implemented",
    errors: ""
  });
}
