var axios = require('axios');
import { Exchange } from "@/lib/model/exchange"; 
import { User } from "@/lib/model/user"; 
import { connectToDb } from "@/lib/utils";
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await connectToDb(); 

  switch (req.method) {
    case "POST":
      return result(req, res); // Call the result logic
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}


async function result(req, res) {
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
      result,
      bets
    } = req.body;

    // Check if user exists
    const user = await User.findOne({ user_id });
    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({
        status: false,
        message: "User not found",
        errors: "User does not exist in the database."
      });
    }

    let totalWinLoss = 0;

    // Process each bet in the result
    for (let bet of bets) {
      const { transation_id, win_loss } = bet;

      // Update the Exchange status based on bet result
      await Exchange.updateOne(
        { transation_id },
        { $set: { status: win_loss > 0 ? 'win' : 'lose', result, win_loss } },
        { session }
      );

      // Update user balance
      totalWinLoss += win_loss;
    }

    // Adjust user balance after processing bets
    const newBalance = user.currency + totalWinLoss;
    await User.updateOne(
      { user_id },
      { $set: { currency: newBalance } },
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();

    // Respond with success
    return res.json({
      status: true,
      message: "Result processed successfully",
      data: {
        balance: newBalance,
        user_id
      },
      errors: ""
    });

  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      errors: error.message
    });
  } finally {
    session.endSession();
  }
}
