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
  await connectToDb(); 
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




  async function callback(req, res) {
    
    const { action } = req.body;
    const {amount, betslip, betslip_id, currency, player_id, session_id, sportsbook_uuid, transaction_id} = req.body; 

    const headers = {
      'X-Merchant-Id': req.headers['x-merchant-id'],
      'X-Nonce': req.headers['x-nonce'],
      'X-Timestamp': req.headers['x-timestamp'],   
    };
    const xSign = req.headers['x-sign'];

    const requestBody = req.body;

     const nestedSortOrder = [
      'category_id', 'category_name', 'competitor_name', 'is_live', 'market_name', 'odds', 
      'outcome_name', 'scheduled', 'sport_id', 'sport_name', 'tournament_id', 'tournament_name',
    ];


    if (requestBody.betslip && requestBody.betslip.items) {
      requestBody.betslip.items = requestBody.betslip.items.map(item => {
        if (item.parameters && typeof item.parameters.is_live === 'boolean') {
          item.parameters.is_live = item.parameters.is_live ? 1 : 0;
        }
        return item;
      });
    }

    const sortedRequestBody = sortRequestBody(requestBody, nestedSortOrder);

    const mergedParams = { ...headers, ...sortedRequestBody };

    const hashString = generateQueryString(mergedParams);
    
    const requestheaders = req.headers;

    const expectedSign = crypto
      .createHmac('sha1', merchantKey)
      .update(hashString)
      .digest('hex');


    await Sportsbooktb.collection.insertOne({ type: 'bet before sign', amount: amount,currency: currency,sportsbook_uuid: sportsbook_uuid,player_id:  player_id,transaction_id: xSign,session_id: expectedSign, action: hashString, betslip: requestheaders, betslip_id: requestBody, createdAt: new Date(),updatedAt: new Date()});

     if (xSign !== expectedSign) {
      return res.status(200).json({
        error_code: "INTERNAL_ERROR",
        error_description: "Invalid sign",
      }); 
    }

    if (action === 'bet') {
    
      try {     

        //    await Sportsbooktb.collection.insertOne({ type: 'bet after sign',  amount, betslip, betslip_id, currency, player_id, session_id, sportsbook_uuid, transaction_id, createdAt: new Date(),updatedAt: new Date()});
            
            const user = await User.findById(player_id).select('first_name email currency');
            if (!user) {
              return res.status(200).json({
                error_code: "INTERNAL_ERROR",
                error_description: "This user does not exist in our system.",
              });
            }
    
            if (amount <= 0) {
              return res.status(200).json({
                balance: user.currency.toFixed(4),
                transaction_id: transaction_id,
              });
            }

            const checkDuplicate = await Sportsbooktb.find({
              $and: [
                { transaction_id: transaction_id },
                { sportsbook_uuid: sportsbook_uuid },
                { player_id: player_id },
                { action: action },
                { session_id: session_id }
              ]
            });

            if (checkDuplicate.length > 0) {
              return res.status(200).json({
                balance: user.currency.toFixed(4),
                transaction_id: transaction_id,
              });
            }

            const currentBalance = parseFloat(user.currency);
            const updatedBalance = currentBalance - amount;

            if (updatedBalance >= 0) {
              user.currency = updatedBalance.toFixed(4);
              await user.save();

              await Sportsbooktb.collection.insertOne({
                amount, currency, sportsbook_uuid, player_id, transaction_id, session_id, action, betslip, betslip_id, status : 'open', createdAt: new Date(), updatedAt: new Date()
              });

              const user_update = await User.findById(player_id).select('first_name email currency');
              const response = {
                balance: user_update.currency.toFixed(4),
                transaction_id: uuidv4(),
              };
              return res.status(200).json(response);
            } else {
              return res.status(200).json({
                error_code: "INSUFFICIENT_FUNDS",
                error_description: "Not enough money to continue playing.",
              });
            }
            
        } catch (error) {
          return  res.status(200).json({
            error_code: "INTERNAL_ERROR",
            error_description: "Something went wrong.",
          });
         
        }
    } else {
      return  res.status(200).json({
        error_code: "INTERNAL_ERROR",
        error_description: "Invalid action parameter.",
      });     
    }    
  
  }

    // Helper function to sort request body
    function sortRequestBody(obj, nestedSortOrder) {
      if (Array.isArray(obj)) {
        return obj.map(item => sortRequestBody(item, nestedSortOrder));
      } else if (typeof obj === 'object' && obj !== null) {
        const sortedObj = {};
        const keys = Object.keys(obj);

        keys.sort((a, b) => {
          const indexA = nestedSortOrder.indexOf(a);
          const indexB = nestedSortOrder.indexOf(b);

          if (indexA === -1 && indexB === -1) {
            return a.localeCompare(b);
          } else if (indexA === -1) {
            return 1;
          } else if (indexB === -1) {
            return -1;
          } else {
            return indexA - indexB;
          }
        });

        keys.forEach(key => {
          sortedObj[key] = sortRequestBody(obj[key], nestedSortOrder);
        });

        return sortedObj;
      } else {
        return obj;
      }
    }


    function generateQueryString(obj, prefix = '') {
      const params = [];
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          let value = obj[key];
          const paramKey = prefix ? `${prefix}[${key}]` : key;
          
          // Convert booleans to 1 or 0
          if (typeof value === 'boolean') {
            value = value ? 1 : 0;
          }
    
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            params.push(generateQueryString(value, paramKey));
          } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
              const arrayKey = `${paramKey}[${index}]`;
              if (typeof item === 'object' && item !== null) {
                params.push(generateQueryString(item, arrayKey));
              } else {
                params.push(`${encodeURIComponent(arrayKey)}=${encodeURIComponent(item).replace(/%20/g, '+')}`);
              }
            });
          } else {
            params.push(`${encodeURIComponent(paramKey)}=${encodeURIComponent(value).replace(/%20/g, '+')}`);
          }
        }
      }
      return params.join('&');
    }

    

    // Helper function to generate URL-encoded query string
    function generateQueryStringBack(obj, prefix = '') {
      const params = [];
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          const paramKey = prefix ? `${prefix}[${key}]` : key;
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            params.push(generateQueryStringBack(value, paramKey));
          } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
              const arrayKey = `${paramKey}[${index}]`;
              if (typeof item === 'object' && item !== null) {
                params.push(generateQueryStringBack(item, arrayKey));
              } else {
                params.push(`${encodeURIComponent(arrayKey)}=${encodeURIComponent(item).replace(/%20/g, '+')}`);
              }
            });
          } else {
            params.push(`${encodeURIComponent(paramKey)}=${encodeURIComponent(value).replace(/%20/g, '+')}`);
          }
        }
      }
      return params.join('&');
    }




  async function empty_method(req, res) {
    return res.json('nothing found');
  }
