import mongoose from "mongoose";

const AgentWalletsSchema = new mongoose.Schema(
  {
    user_id: {
        type: String,
        required: true
    },

    wallet_method: {
        type: String,
        required: true,
        ref: "bkash, nagad, rocket"
    },
    wallet_type: {
        type: String,
        required: true,
        ref: "personal, agent"
    },
    agent_wallet: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'], 
        required: true,
    },
  
    
  }, 
  { timestamps: true }
);

export const AgentWallets = mongoose.models?.AgentWallets || mongoose.model("AgentWallets", AgentWalletsSchema);
