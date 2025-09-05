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
      if (req.query.init) {       
        return init(req, res);
      }   else  if (req.query.bonus_template) {       
        return betting_bonus_templates(req, res);
      }   else {      
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
 


  async function init(req, res) {   

      const user_id = req.query.userid;     
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
        //page: currentPage,
      };

      const { sign , queryString } = calculateXSign(headers, requestParams)
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

     // await Sportsbooktb.collection.insertOne({ transaction_id: 'sports book list',session_id: sign,action: queryString,createdAt: new Date(),updatedAt: new Date()});


      try {
       // const apiUrlWithQuery = url.format({ pathname: `${apiUrl}/sportsbooks`, query: requestParams});
        const apiUrlWithQuery = url.format({ pathname: `${apiUrl}/sportsbooks`});
        const response = await axios.get(apiUrlWithQuery, requestOptions); 
        console.log('return response', response.data);

          const sportsbook_uuid = response.data[0].uuid;       
          const user_details    = await User.findOne({ user_id });

          const sessionId = uuidv4();
          const requestParams2 = {
            currency: 'USD',
            email: user_details.email || user_details.user_id+'@gmail.com',
            language: 'en',
            player_id: user_details.id,
            player_name: user_details.first_name || user_details.user_id,
            return_url: home_path,
            session_id: sessionId,
            sportsbook_uuid : sportsbook_uuid,
          };
      
          const { sign, queryString } = calculateXSign(headers, requestParams2);
          const apiUrlWith = url.format({ pathname: `${apiUrl}/sportsbooks/init` });
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

          await Sportsbooktb.collection.insertOne({ transaction_id: 'game init', session_id: sign,action: queryString, createdAt: new Date(),updatedAt: new Date()});

          const result = await axios.post(apiUrlWith, requestParams2, options);
          console.log('received sessionId', sessionId);
          //res.header("Access-Control-Allow-Origin", "*");
          //return res.json(result.data);

          // Include sessionId in the response data
          const responseData = {
            sessionId: sessionId,
            data: result.data
          };
          return res.json(responseData);
      } catch (error) {
        res.status(500).json({
          error:
            error.message
        });
      }
  }


  async function betting_bonus_templates(req, res) {   

       const user_id = req.query.userid;

      const currentPage = 1;
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
      const requestParams = {
        page: currentPage,
      };

      const { sign } = calculateXSign(headers, requestParams)
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
      try {
        const apiUrlWithQuery = url.format({ pathname: `${apiUrl}/betting-bonus-templates/list
        `, query: requestParams});
        const response = await axios.get(apiUrlWithQuery, requestOptions); 

          const sportsbook_uuid = response.data[0].uuid;       
          const user_details    = await User.findOne({ user_id });
          console.log('return', user_details);
          const requestParams2 = {
            currency: 'USD',
            email: user_details.email,
            language: 'en',
            player_id: user_details.id,
            player_name: user_details.first_name || user_details.user_id,
            return_url: home_path,
            session_id: uuidv4(),
            sportsbook_uuid : sportsbook_uuid,
          };
      
          const { sign, queryString } = calculateXSign(headers, requestParams2);
          const apiUrlWith = url.format({ pathname: `${apiUrl}/sportsbooks/init` });
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
          console.log('received result', result.data.url);
          //res.header("Access-Control-Allow-Origin", "*");
          return res.json(result.data);
      } catch (error) {
        res.status(500).json({
          error:
            error.message
        });
      }
  }

 
  async function empty_method(req, res) {
    return res.json('nothing found...');
  }
 
