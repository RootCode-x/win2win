var axios = require('axios');
import { Gamelist } from "@/lib/model/gamelist"; 
import { Sportsbooktb } from "@/lib/model/sportsbooktb"; 
import { User } from "@/lib/model/user"; 
import { connectToDb } from "@/lib/utils";
import { v4 as uuidv4 } from 'uuid';
const querystring = require('querystring');
const url = require('url');
import {home_path} from '@/lib/api_path';

// demo

const client_key = 'xxxxxxxxxxxxxx';
const client_name = 'xxxxxxxxxxxx';

export default async function handler(req, res) {
  await connectToDb(); // Establish connection (assuming pooling)

  switch (req.method) {
    case "GET":
      if (req.query.init) {       
        return init(req, res);
      } else {      
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

async function init(req, res) {   
    const userId = req.query.userid;

    // Find user details
    const user_details = await User.findOne({ user_id: userId });
    if (!user_details) {
      return res.status(404).json({ error: "User not found" });
    }

    // Build request data
    const requestData = {
      user_id: user_details.user_id,
      client_key: client_key,
      client_name: client_name,
      balance: user_details.currency,
      back_url: 'https://domain.co'
    };

    
    // Axios request for creating a session
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://domain.com',
      headers: {},
      data: JSON.stringify(requestData)
    };

    const response = await axios(config);
    const responseData = response.data;
    
    if (responseData.status === 1 && responseData.data.url) {
      const sessionUrl = responseData.data.url;

      // Respond with session details
      return res.json({
        status: "success",
        url: sessionUrl
      });
    } else {
      return res.status(400).json({
        error: "Failed to create session",
        details: responseData.data.message
      });
    }

}


async function empty_method(req, res) {
  return res.json('nothing found...');
}
