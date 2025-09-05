import mongoose from "mongoose";

const ExchangeSchema = new mongoose.Schema(
  {
    user_id: {
        type: String,
        required: false
    },
    sport_name: {
        type: String,
        required: false
    },
    sport_id: {
        type: Number,
        required: false
    },
    amount: {
        type: Number,
        required: false
    },
    exposure: {
        type: String,
        required: false
    },
    match_name: {
        type: String,
        required: false
    },
    match_id: {
        type: String,
        required: false
    },
    round_name: {
        type: String,
        required: false
    },
    round_id: {
        type: String,
        required: false
    },
    size: {
        type: String,
        required: false
    },
    odds: {
        type: String,
        required: false
    },
    selection: {
        type: String,
        required: false
    },
    back_lay: {
        type: String,
        required: false
    },
    transation_id: {
        type: String,
        required: false
    },
    result: {
        type: String,
        required: false
    },
    bets: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'reject'], 
        required: true,
    },
    
  }, 
  { timestamps: true }
);

export const Exchange = mongoose.models?.Exchange || mongoose.model("Exchange", ExchangeSchema);


