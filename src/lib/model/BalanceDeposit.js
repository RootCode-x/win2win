const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const BalanceDepositSchema = new Schema({
  deposit_type: {
    type: String,
    required: true,
    ref: "1= reseller", // This ref value doesn't seem to be a valid reference. Please review this.
  },
  user_id: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transaction_id: {
    type: String,
    required: true,
  },
  payment_type: {
    type: String,
    required: true,
  },
  status_type: {
    type: Number,
    default: 0,
    ref: "0= Pending, 1= Paid, 2 = Block", // This ref value also seems incorrect. Please review this.
  },
}, {
  timestamps: true,
});

// Create the model using the schema
const BalanceDeposit = mongoose.model("BalanceDeposit", BalanceDepositSchema);

module.exports = BalanceDeposit;
