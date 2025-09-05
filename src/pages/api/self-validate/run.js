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

const apiUrl      = 'https://domain.com';
const merchantId  = 'xxxxxxxxxx';
const merchantKey = 'xxxxxxxxxx';


export default async function handler(req, res) {
  await connectToDb(); // Establish connection (assuming pooling)

  switch (req.method) {
    case "GET":
      if (req.query.taskIdGenerate) {       
        return taskIdGenerate(req, res);
      }   else if (req.query.selfValidateResult){      
        return selfValidateResult(req, res);
      }  else {      
        return empty_method(req, res);
      }
    case "POST":
      return empty_method(req, res);
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


  async function taskIdGenerate(req, res) {  

      const user_id = 'U228315';   
      const session_id = req.query.session_id;   

      const time = Math.floor(Date.now() / 1000).toString();
      const nonce = crypto
      .createHash('md5')
      .update(crypto.randomBytes(16))
      .digest('hex');

      const headers = {
        'X-Merchant-Id': merchantId,
        'X-Timestamp': time,
        'X-Nonce': nonce,
      };
   
        const user_details    = await User.findOne({ user_id });
        const requestParams2 = {
          currency: 'USD',
          player_id: user_details.id,
          session_id: session_id,
        };
    
        const { sign, queryString } = calculateXSign(headers, requestParams2);
        const apiUrlWith = url.format({ pathname: `${apiUrl}/self-validate/run` });
        const options = {
          method: 'POST',
          headers: {
            'X-Merchant-Id': merchantId,
            'X-Timestamp': time,
            'X-Nonce': nonce,
            'X-Sign': sign,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          data: queryString,
        };

    
        const result = await axios.post(apiUrlWith, requestParams2, options);
        return res.json(result.data);
    }


    
    async function selfValidateResult(req, res) {
      try {
        const task_id = req.query.task_id;
        // const task_id = "665b1efe-c1cd-1de9-3eb8-800079fc1709";
        const time = Math.floor(Date.now() / 1000).toString();
        const nonce = crypto
          .createHash('md5')
          .update(crypto.randomBytes(16))
          .digest('hex');
    
        const headers = {
          'X-Merchant-Id': merchantId,
          'X-Timestamp': time,
          'X-Nonce': nonce,
        };
    
        const currentPage = 1;
        const requestParams = {
          // page: currentPage,
        };
    
        const { sign, queryString } = calculateXSign(headers, requestParams);
        const requestOptions = {
          headers: {
            'X-Merchant-Id': merchantId,
            'X-Timestamp': time,
            'X-Nonce': nonce,
            'X-Sign': sign,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        };
    
        const apiUrlWithQuery = url.format({ pathname: `${apiUrl}/self-validate/result/${task_id}` });
        const result = await axios.get(apiUrlWithQuery, requestOptions);
        console.log('return result', result.data);
    
        return res.json(result.data); // Use result.data to avoid circular reference
      } catch (error) {
        console.error('Error fetching validation result:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
     
    }

 
  async function empty_method(req, res) {
    return res.json('nothing found...');
  }
 
