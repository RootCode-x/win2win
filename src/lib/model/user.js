import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
  
    first_name: {
      type: String,
    },

    last_name: {
      type: String,
    },

    dob: {
      type: String,
    },

    address: {
      type: String,
    },

    zip: {
      type: String,
    },

    city: {
      type: String,
    },
    
    state: {
      type: String,
    },

    country: {
      type: String,
    },
    
    country_currency: {
      type: String,
    },
    
    language: {
      type: String,
    },

    image: {
      type: String,
    },
    
    handle: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: false,     
      //unique: true,
      max: 50,
    },

    password: {
      type: String,
      required: true,
    },

    tpin: {
      type: String,
      required: true,
    },

    currency: {
      type: Number,
      precision: 4,
      default: 0,
    },
    
    exposure: {
      type: Number,
      required: false,     
    },
    
    role_as: {
      type: Number,
      default: 3,
      ref: "1 = Admin, 2 = Country Agent, 2.1 = Master Agent, 3 = User, 4 = Agent",
    },

    mobile: {
      type: String,
      required: false,
    },

    personal_mobile: {
      type: String,
      required: false,
    },

    curr_sign: {
      type: String,
      required: false,
    },

    // affliate/agent: ref_percentage, deposit_percentage
    
    agent_id: {
      type: String,
      ref: " agent id for withdraw and deposit",
    },

    refferer: {
      type: String
    },

    ref_percentage: {
      type: String
    },

    deposit_percentage: {
      type: Number
    },

    status: {
      type: String
    },  

    account_status: {
      type: String,
      default: 1,
    },    

    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    
  }, 
  { timestamps: true }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
