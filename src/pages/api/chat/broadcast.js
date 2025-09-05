import { User } from "@/lib/model/user"; 
import { connectToDb } from "@/lib/utils";
const axios = require('axios');
const Pusher = require('pusher');
import {pusher_appId, pusher_key, pusher_secret, pusher_cluster} from '@/lib/api_path';
import { Chat } from "../../../lib/model/chat"; 
const Promise = require('promise');

 const pusher = new Pusher({
    appId: pusher_appId,
    key: pusher_key,
    secret: pusher_secret,
    cluster: pusher_cluster,
});


  export default async function handler(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', '*'); 
    res.setHeader('Access-Control-Allow-Headers', '*'); 
    
    await connectToDb();
    
    switch (req.method) {
      case "GET":
        if (req.query.agentList) {       
          return agentList(req, res);
        }else if (req.query.allAgentList) {       
          return allAgentList(req, res);
        } else {      
          return empty_method(req, res);
        }
      case "POST":
        if (req.body.posttype == "new_chats") {       
          return new_chats(req, res);
        }   else  if (req.body.posttype == "chats") {       
          return chats(req, res);
        }   else if (req.body.posttype == "broadcast") {      
          return broadcast(req, res);
        } else if (req.body.posttype == "receive") {      
          return receive(req, res);
        }else  {      
          return empty_method(req, res);
        }
      case "PUT":
        return empty_method(req, res);
      case "DELETE":
        return empty_method(req, res);
      default:
        return res.status(200).json({ error: "Method not allowed" });
    }


  }

  async function broadcast(req, res) {
    const {message, senderid, receiverid } = req.body;
    const data = { message, senderid, receiverid };
    const newChat = new Chat({
        senderid: senderid,
        receiverid: receiverid,
        message: message,
        status: 'sent' 
    });
    try {
        await newChat.save();
    } catch (error) {
        console.error('Error saving chat message:', error);
        return res.status(500).json({ success: false, error: 'Failed to save chat message' });
    }
    pusher.trigger('public', 'chat', data);   
    return res.json({ success: true, data });
  }

  async function receive(req, res) {
    const { message , senderid, receiverid} = req.body;
    const data = { message , senderid, receiverid};
    return res.json({ success: true, data });
  }



  async function new_chats(req, res) {
    try {
        const { user_id, role_as } = req.body;
        // Get the list of receiver IDs for unseen messages
        const unseenReceiverIds = await Chat.find({
            receiverid: user_id,
            // status: { $ne: 'seen' } 
        }).distinct('senderid');
        // Fetch receiver information for the unseen messages
        const receiverInfo = await User.find({ user_id: { $in: unseenReceiverIds } })
                                    .select('user_id first_name last_name email phone');
        return res.json(receiverInfo);
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  }



  async function chats(req, res) {
    try {
        const { senderid, receiverid } = req.body;
        const chatMessages = await Chat.find({
            $or: [
                { senderid: senderid, receiverid: receiverid },
                { senderid: receiverid, receiverid: senderid }
            ]
        }).sort({ createdAt: 1 }); // Sort by createdAt in ascending order
        
         await Chat.updateMany(
          { receiverid: senderid , senderid: receiverid, status: 'sent' }, // Filter for unseen messages
          { $set: { status: 'seen' } }, // Update status to 'seen'
          { new: true } // Return updated document
        );

        const receiverInfo = await User.findOne({ user_id: receiverid }).select('user_id first_name last_name email phone');
        return res.json({ chatMessages, receiverInfo });

    } catch (error) {
        console.error('Error fetching chat messages:', error);
        return  res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async function agentList(req, res) {
    try {
      //const receiverInfo = await User.find({ role_as: 4 }).select('user_id id');

      const { user_id } = req.query;
      const super_agent_details = await User.findOne({ user_id: user_id }).select('user_id mobile currency first_name last_name email refferer agent_id');
      const receiverInfos = await User.find({ user_id:super_agent_details.refferer, account_status: { $ne: 2 } }).select('user_id id');
      // Fetch unread message count for each user
      const receiverIds = receiverInfos.map(agent => agent.user_id);
      const unreadCounts = await Promise.all(receiverIds.map(userId => fetchUnreadMessageCount(userId, user_id)));
      // Combine receiverInfos and unreadCounts into an array of objects
      const receiverInfo = receiverInfos.map((agent, index) => ({
        ...agent.toObject(),
        unreadCount: unreadCounts[index]
      }));
  
      return res.json(receiverInfo);

      //return res.json(receiverInfo);
    } catch (error) {
      console.error('Error fetching agents:', error);
      // Handle error gracefully (e.g., send an error response with status code)
    }
  }

  
  async function allAgentList(req, res) {
    try {
 
      const receiverInfos = await User.find({ role_as: 4, account_status: { $ne: 2 } }).select('user_id id');
      return res.json(receiverInfos);

    } catch (error) {
      console.error('Error fetching agents:', error);
      // Handle error gracefully (e.g., send an error response with status code)
    }
  }

  

  const fetchUnreadMessageCount = async (agent_id, user_id) => {
    try {
      const unreadCount = await Chat.countDocuments({
        receiverid: user_id,
        senderid: agent_id,
        status: 'sent'
      });
      return unreadCount === 0 ? '0' : unreadCount + ' MSG '
    } catch (error) {
      console.error('Error fetching unread message count:', error);
      return 0;
    }
  };
  

  async function empty_method(req, res) {
    return res.json('nothing found');
  }

