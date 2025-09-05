const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Need to add currency 
const UserBLTRSchema = new Schema({

  
  // email: {
  //   type: String,
  //   required: true
  // },

  user_id: {
    type: String,
    required: true
  },
  
  sender_id: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },
  //Datetime is not hooked into mongoose, makes data manipulation and database application diffcult 
  //https://github.com/Automattic/mongoose/issues/1598
  s_key: {
    type: String,
    required: true
  },

  status_type: {
    type: Number,
    default: 0, 
    ref: "0= Pending, 1= Paid, 2 = Block",

  },


  history: []
}, {
  timestamps: true
})

const UserBLTR = mongoose.model('userBLTR', UserBLTRSchema);

module.exports = UserBLTR;
