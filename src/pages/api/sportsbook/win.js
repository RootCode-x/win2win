import { Gamelist } from "@/lib/model/gamelist"; 
import { Sportsbooktb } from "@/lib/model/sportsbooktb"; 
import { User } from "@/lib/model/user"; 
import { connectToDb } from "@/lib/utils";
const crypto = require('crypto');
import { v4 as uuidv4 } from 'uuid';
const querystring = require('querystring');
const url = require('url');
const axios = require('axios');
import {home_path} from '@/lib/api_path';

// live
const apiUrl      = 'https://domain.com';
const merchantId  = 'xxxxxxxxxxxxxxx';
const merchantKey = 'xxxxxxxxxxxxxxx';

export default async function handler(req, res) {
  await connectToDb(); // Establish connection (assuming pooling)

  switch (req.method) {
    case "GET":
      if (req.query.sportsbooks) {       
        return empty_method(req, res);
      }   else  if (req.query.bonus_template) {       
        return empty_method(req, res);
      }   else {      
        return empty_method(req, res);
      }
    case "POST":
      return callback(req, res);
    case "PUT":
      return empty_method(req, res);
    case "DELETE":
      return empty_method(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}


  function calculateXSign(headers, params) {
    const mergedObject = { ...headers, ...params };
    const sortedKeys = Object.keys(mergedObject).sort();
    const sortedObject = sortedKeys.reduce((obj, key) => {
      obj[key] = mergedObject[key];
      return obj;
    }, {});
    const queryString = querystring.stringify(sortedObject);
    const hmac = crypto.createHmac('sha1', merchantKey);
    hmac.update(queryString);
    const sign = hmac.digest('hex');
    return { sign, queryString };
  }

 
  async function callback(req, res) {

    const headers = {
      'X-Merchant-Id': req.headers['x-merchant-id'], // Replace with the actual header name
      'X-Timestamp': req.headers['x-timestamp'],
      'X-Nonce': req.headers['x-nonce'],
    };
    const XSign = req.headers['x-sign'];
 
    const { action } = req.body; 
  
    const requestParams = { ...req.body, ...headers };
    const { sign, queryString } = calculateXSign(headers, requestParams)
  
    if (action !== 'rollback') {
      if (XSign !== sign) {
        // return res.status(200).json({
        //   error_code: "INTERNAL_ERROR",
        //   error_description: "Invalid sign",
        // });     
      } 
    }
 
    if (action === 'win') {
      try {          
          const {action, amount, betslip, betslip_id, currency, player_id, session_id, sportsbook_uuid, transaction_id} = req.body; 
          // const userObjectID = new ObjectID(player_id);
          
          const user = await User.findById(player_id).select('first_name email currency');  

          if (!user) {
            return   res.status(200).json({
              error_code: "INTERNAL_ERROR",
              error_description: "This user does not exist in our system.",
            });        
          }

          if (amount <= 0) {
            // return  res.status(200).json({
            //   balance: user.currency.toFixed(4),
            //   transaction_id: transaction_id,
            // });        
          }

          const checkDuplicate = await Sportsbooktb.find({
            $and: [            
              { transaction_id: transaction_id },
              { sportsbook_uuid: sportsbook_uuid },
              { player_id: player_id },
              { action: action},
              { session_id: session_id }
            ]
          });

          if (checkDuplicate.length === 0) {
            const message = 'ok';
          } else{
              if (checkDuplicate[0].transaction_id === transaction_id) {
                  return res.status(200).json({
                      balance: user.currency.toFixed(4),
                      transaction_id: checkDuplicate[0].ref_transaction_id,
                  });
              } else {
                  return res.status(200).json({
                      balance: user.currency.toFixed(4),
                      transaction_id: transaction_id,
                  });
              }
          }        
        
          const previousBetCheck = await Sportsbooktb.find({
            betslip_id: betslip_id,
            sportsbook_uuid: sportsbook_uuid,
            session_id: session_id,
            player_id: player_id
          });
          
          if (previousBetCheck.length === 0) {
            return res.status(200).json({
              error_code: "INTERNAL_ERROR",
              error_description: "Bet transaction was not found.",
            });
          }
          

          const SettledBetCheck = await Sportsbooktb.findOne({
            betslip_id: betslip_id,
            player_id: player_id
          });
          
          if (SettledBetCheck && SettledBetCheck.status === 'settled') {
            return res.status(200).json({
              error_code: "INTERNAL_ERROR",
              error_description: "This Bet is already settled.",
            });
          }




            const currentBalance = user.currency;  
            const updatedBalance = parseFloat(currentBalance) + parseFloat(amount);
            user.currency = updatedBalance.toFixed(4);
           
            await user.save();    
            
            const win_trans_id = uuidv4();

            await Sportsbooktb.collection.insertOne({ amount: amount,currency: currency,sportsbook_uuid: sportsbook_uuid,player_id: player_id,transaction_id: transaction_id,session_id: session_id,action: action,ref_transaction_id: win_trans_id,betslip: betslip,betslip_id: betslip_id, createdAt: new Date(),updatedAt: new Date()});

            const user_update = await User.findById(player_id).select('first_name email currency');  
            const response = {
              balance: user_update.currency.toFixed(4),
              transaction_id: win_trans_id,
            };

            return    res.status(200).json(response);         
                       
        } catch (error) {
          return   res.status(200).json({
            error_code: "INTERNAL_ERROR",
            error_description: "Something went wrong.",
          });    
        }
    }  else {
      return  res.status(200).json({
        error_code: "INTERNAL_ERROR",
        error_description: "Invalid action parameter.",
      });     
    }    
  
  }
  
 

  async function empty_method(req, res) {
    return res.json('nothing found');
  }
  

