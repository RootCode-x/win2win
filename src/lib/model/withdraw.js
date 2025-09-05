import mongoose from "mongoose";

const WithdrawSchema = new mongoose.Schema(
  {
    user_id: {
        type: String,
        required: true
    },
    agent_id: {
        type: String,
        required: true
    },
    selected_method: {
        type: String,
        required: true
    },
    withdraw_amount: {
        type: Number,
        required: true
    },
    chargedAmount: {
        type: Number,
        required: true
    },
    withdraw_amount_in_bdt: {
        type: Number,
        required: true
    },
    sender_number: {
        type: String,
        required: true
    },
    trxid: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Reject'], 
        required: true,
    },
    
  }, 
  { timestamps: true }
);

export const Withdraw = mongoose.models?.Withdraw || mongoose.model("Withdraw", WithdrawSchema);
