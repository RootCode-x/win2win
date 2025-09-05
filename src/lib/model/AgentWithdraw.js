const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Need to add currency 
const AgentWithdrawSchema = new Schema({
  
  receiver_user_id: {
    type: String,
    required: true
  }, 
  
  user_id: {
    type: String,
    required: true
  }, 

  agentEmail: {
    type: String,
    required: true
  },

  pay_amount: {
    type: Number,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  voucher: {
    type: String,
    required: true
  },

  transaction_id: {
    type: String,
    required: false
  },

  payment: {
    type: Number,
    default: 0, 
    ref: "0= Bkash, 1= Nagad, 2= Rocket, 3= Upay, 4= Bank Number",
  },

  withdraw_type: {
    type: String,
    default: null, 
    ref: "1 = withdraw user to reseller, 2 = withdraw sub reseller to reseller, 3 = withdraw reseller to admin",
  },

  acc_number: {
    type: String,
    required: true
  },
 
  status_type: {
    type: Number,
    default: 0, 
    ref: "0= Pending, 1= Paid, 2= Rejected,  3 = Block",
  }

}, {
  timestamps: true
})

const AgentWithdraw = mongoose.model('agentWithdraw', AgentWithdrawSchema);

module.exports = AgentWithdraw;
