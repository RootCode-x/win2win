const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sportsbooktbSchema = new Schema(
  {
    player_id: {
      type: String,
      required: true
    },
    player_ip: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      default: null
    },
    currency: {
      type: String,
      default: null
    },
    sportsbook_uuid: {
      type: String,
      default: null
    },
    transaction_id: {
      type: String,
      default: null
    },
    session_id: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    betslip: {
      type: String,
      default: null
    },
    betslip_id: {
      type: String,
      default: null
    },
    ref_transaction_id: {
      type: String,
      default: null
    },
    status: {
      type: String,
      default: null
    },
 

   
  },
  {
    timestamps: true // Add timestamps option to enable automatic insertion of createdAt and updatedAt fields
  }
);

export const Sportsbooktb = mongoose.models?.Sportsbooktb || mongoose.model("Sportsbooktb", sportsbooktbSchema);

