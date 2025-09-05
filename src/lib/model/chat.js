import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
 
    senderid: {
        type: String,
        required: true
    },
    receiverid: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['sent', 'seen'], // Add 'seen' as a status option
        required: true,
    },
    seenAt: {
        type: Date, // Optionally, you can also store the timestamp of when the message was seen
    },
    
  }, 
  { timestamps: true }
);

export const Chat = mongoose.models?.Chat || mongoose.model("Chat", ChatSchema);
