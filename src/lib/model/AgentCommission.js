const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Need to add currency 
const AgentCommissionSchema = new Schema({

  agent_id: {
    type: String,
    required: true
  }, 
  
  user_id: {
    type: String,
    required: true
  }, 


  amount: {
    type: Number,
    required: true
  },

  commission: {
    type: Number,
    required: true
  },

  transfer_id: {
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

const AgentCommission = mongoose.model('agentCommission', AgentCommissionSchema);

module.exports = AgentCommission;
