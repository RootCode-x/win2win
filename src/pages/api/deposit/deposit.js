import { User } from "@/lib/model/user"; 
import { AgentWallets } from "@/lib/model/agentWallets"; 
import { connectToDb } from "@/lib/utils";
import { Deposit } from "../../../lib/model/deposit"; 
const Promise = require('promise');

  export default async function handler(req, res) {
    // res.setHeader('Access-Control-Allow-Origin', '*'); 
    // res.setHeader('Access-Control-Allow-Methods', '*'); 
    // res.setHeader('Access-Control-Allow-Headers', '*'); 
    await connectToDb();
    switch (req.method) {
      case "GET":
        if (req.query.report) {       
          return deposit_report(req, res);
        }  if (req.query.depositMethod) {       
          return depositMethod(req, res);
        } else {      
          return empty_method(req, res);
        }
      case "POST":
        if (req.body.posttype == "deposit_now") {       
          return deposit_now(req, res);
        } else {     
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



  async function deposit_now(req, res) {
    try {

      const {user_id, selected_method, agent_id, wallet_type, send_amount, agent_wallet, send_amount_in_bdt, sender_number , trxid } = req.body;

        
      const sendAmount = parseFloat(send_amount);
      const sendAmountInBdt = parseFloat(send_amount_in_bdt); 
      
      if (isNaN(sendAmount) || sendAmount < 200) {
        return res.status(400).json({
          error: "Minimum deposit is 200tk and amount must be a valid number.",
        });
      }
      if (isNaN(sendAmountInBdt)) {
        return res.status(400).json({
          error: "send_amount_in_bdt must be a valid number.",
        });
      }

       const existingTransaction = await Deposit.findOne({ trxid,status: "pending",user_id: user_id });
      if (existingTransaction) {
        return res
          .status(400)
          .json({ error: "Duplicate transaction detected. Deposit already exists." });
      }


       const existingTransactionpaid = await Deposit.findOne({ trxid,status: "paid",user_id: user_id });
      if (existingTransactionpaid) {
        return res
          .status(400)
          .json({ error: "Duplicate transaction detected. Deposit already exists." });
      }


      const newDeposit = new Deposit({
          user_id : user_id,
          agent_id : agent_id,
          selected_method : selected_method,
          wallet_type : wallet_type,
          send_amount : sendAmount,
          agent_wallet : agent_wallet,
          send_amount_in_bdt : sendAmountInBdt,
          sender_number : sender_number,
          status : 'pending',
          trxid : trxid
      });

      await newDeposit.save();

      const agent_details = await User.findOne({ user_id: agent_id }).select('user_id mobile first_name last_name email');
      
      const agent_phone = agent_details.mobile;
      
      // Send SMS to the agent
      const message = `You have received ${send_amount}tk Deposit from ${user_id}. Please Approve.`;
      const smsUrl = `https://24bulksms.com/24bulksms/api/api-sms-send?sender_id=xxxxxx&api_key=xxxxxxxxxxxx&mobile_no=${agent_phone}&message=${encodeURIComponent(message)}&user_email=info@mail.com`;


      // Sending the SMS
      const smsResponse = await fetch(smsUrl);
      
      if (!smsResponse.ok) {
        console.error('Failed to send SMS:', await smsResponse.text());
      }


      return  res.status(200).json('Successfully deposit request sent.Please Wait for apporval..');

    } catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  async function deposit_report(req, res) {
    try {
      const { user_id } = req.query;
      const result = await Deposit.find({ user_id: user_id }).sort({_id:-1});
      return res.json(result);

    } catch (error) {
      console.error('Error fetching agents:', error);
      // Handle error gracefully (e.g., send an error response with status code)
    }
  }




  async function depositMethod(req, res) {
    try {
  
      const agent_id = req.query.agent_id || req.session.user.agent_id;
  
      if (!agent_id) {
        return res.status(400).json({ error: 'Agent ID is required' });
      }
      

      const agent_details = await User.findOne({ user_id: agent_id }).select('user_id mobile currency first_name last_name email refferer agent_id');
      
      if (!agent_details) {
        return res.status(404).json({ error: 'Agent not found' });
      }

      const super_agent_details = await User.findOne({ user_id: agent_details.refferer }).select('user_id mobile currency first_name last_name email refferer agent_id');
     
      const super_agent_details_currency = super_agent_details.currency;
      if (super_agent_details_currency < 200) {
         return res.status(400).json({ error: 'Insufficient Agent Balance' });
      }

      const result = await AgentWallets.aggregate([
        {
          $match: {
            user_id: super_agent_details.user_id,
            status: "active",  
            wallet_method: { $in: ["bKash", "Rocket", "Nagad"] }
          }
        },
        {
          $group: {
            _id: "$wallet_method",
            documents: { $push: "$$ROOT" }
          }
        },
        {
          $project: {
            _id: 0,
            wallet_method: "$_id",
            document: { $arrayElemAt: ["$documents", { $floor: { $multiply: [{ $rand: {} }, { $size: "$documents" }] } }] }
          }
        },
        {
          $replaceRoot: { newRoot: "$document" }
        }
      ]);
  
      return res.json(result);
  
    } catch (error) {
      console.error('Error fetching agent wallet:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  






  async function empty_method(req, res) {
    return res.json('nothing found');
  }

