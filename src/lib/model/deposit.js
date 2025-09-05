import mongoose from "mongoose";

const DepositSchema = new mongoose.Schema(
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
    wallet_type: {
        type: String,
        required: true
    },
    send_amount: {
        type: Number,
        required: true,
        get: v => Number(v.toFixed(4)), 
        set: v => Number(v.toFixed(4)) 
    },
    agent_wallet: {
        type: String,
        required: true
    },
    send_amount_in_bdt: {
        type: Number,
        required: true,
        get: v => Number(v.toFixed(4)),
        set: v => Number(v.toFixed(4))
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
        enum: ['pending', 'paid', 'reject'], 
        required: true,
    },
    
  }, 
  { timestamps: true }
);

export const Deposit = mongoose.models?.Deposit || mongoose.model("Deposit", DepositSchema);
