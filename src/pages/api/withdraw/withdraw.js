import { User } from "@/lib/model/user"; 
import { AgentWallets } from "@/lib/model/agentWallets"; 
import { connectToDb } from "@/lib/utils";
import { Withdraw } from "@/lib/model/withdraw"; 
import { Deposit } from "@/lib/model/deposit"; 
import { SlotegratorGames } from "@/lib/model/SlotegratorGames"; 
import { Exchange } from "@/lib/model/exchange"; 

import bcrypt from "bcryptjs";
import mongoose from 'mongoose';


  export default async function handler(req, res) {
    // res.setHeader('Access-Control-Allow-Origin', '*'); 
    // res.setHeader('Access-Control-Allow-Methods', '*'); 
    // res.setHeader('Access-Control-Allow-Headers', '*'); 
    await connectToDb();
    switch (req.method) {
      case "GET":
        if (req.query.report) {       
          return withdraw_report(req, res);
        }  if (req.query.withdrawMethod) {       
          return withdrawMethod(req, res);
        } else {      
          return empty_method(req, res);
        }
      case "POST":
        if (req.body.posttype == "withdraw_now") {       
          return withdraw_now(req, res);
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

  async function withdraw_now(req, res) {
    try {
        const { user_id, agent_id, WithdrawMethod, mobile_no, trans_pass, withdraw_amount, chargedAmount, net_withdraw_amount } = req.body;

  
        if (!user_id) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        if (!agent_id) {
            return res.status(400).json({ error: 'Agent ID is required' });
        }
        if (!WithdrawMethod) {
            return res.status(400).json({ error: 'Withdrawal Method is required' });
        }
        if (!mobile_no) {
            return res.status(400).json({ error: 'Mobile Number is required' });
        }
        if (!trans_pass) {
            return res.status(400).json({ error: 'Transaction Password is required' });
        }
       
        // Validate withdrawal amount
        if (withdraw_amount <= 0 ) {
          return res.status(400).json({ error: 'Invalid withdrawal amount' });
        }

       if (isNaN(withdraw_amount) || withdraw_amount < 499) {
          return res.status(400).json({ error: "Minimum Withdraw is 500tk " });
       }


        const user = await User.findOne({user_id : user_id});
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(trans_pass, user.tpin);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid transaction password' });
        }

        if (user.currency < withdraw_amount) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        if ( withdraw_amount < 10 ) {
            return res.status(400).json({ error: 'Minimum Withdraw $10' });
        }

        const existingTransaction = await Withdraw.findOne({  status: 'Pending', user_id });
        if (existingTransaction) {
          return res
            .status(400)
            .json({ error: "Pending withdraw exist. Please try again after paid." });
        }
      
        const userDetails = await User.findOne({ user_id: user_id });
       
        console.log("exposure Details:", userDetails);

        if (userDetails.exposure > 0) { 
          return res.status(400).json({
            error: `Your turnover is not fulfilled. Exposure Balance: ${userDetails.exposure}`,
          });
        }

        const agent_details       = await User.findOne({ user_id: agent_id }).select('user_id mobile first_name last_name email refferer');
        const super_agent_details = await User.findOne({ user_id: agent_details.refferer }).select('user_id mobile currency first_name last_name email refferer agent_id');
  
        const withdraw = new Withdraw({
            user_id,
            agent_id : super_agent_details.user_id,
            selected_method : WithdrawMethod,
            sender_number : mobile_no,
            trxid : Math.random().toString(36).substring(2, 15), 
            withdraw_amount,
            chargedAmount : 0,
            withdraw_amount_in_bdt : net_withdraw_amount,
            status: 'Pending', 
            createdAt: new Date(), 
        });

        await withdraw.save();

        user.currency -= withdraw_amount;
        await user.save();
    
        const agent_phone = super_agent_details.mobile;
        
        const message = `You have received ${withdraw_amount} tk Withdraw from ${user_id}. Please Approve.`;
        const smsUrl = `https://domain.com/api/api-sms-send?sender_id=xxxx&api_key=xxxxxxx&mobile_no=${agent_phone}&message=${encodeURIComponent(message)}&user_email=info@email.com`;
  
        const smsResponse = await fetch(smsUrl);
        
        if (!smsResponse.ok) {
          console.error('Failed to send SMS:', await smsResponse.text());
        }


        // Respond with a success message
        return res.status(200).json({ message: 'Successfully withdraw request sent. Please wait for approval.' });
    } catch (error) {
        console.error('Error processing withdrawal request:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

  async function withdraw_report(req, res) {
    try {
      const { user_id } = req.query;
      const result = await Withdraw.find({ user_id: user_id }).sort({_id:-1});
      return res.json(result);

    } catch (error) {
      console.error('Error fetching agents:', error);
      // Handle error gracefully (e.g., send an error response with status code)
    }
  }


  async function withdrawMethod(req, res) {
    try {
      const result = await AgentWallets.aggregate([
        {
            $match: {
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
      console.error('Error fetching agents wallet:', error);
    }
  }


  async function empty_method(req, res) {
    return res.json('nothing found');
  }

