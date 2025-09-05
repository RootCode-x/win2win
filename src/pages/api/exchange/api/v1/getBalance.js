var axios = require('axios');
import { Gamelist } from "@/lib/model/gamelist"; 
import { Sportsbooktb } from "@/lib/model/sportsbooktb"; 
import { User } from "@/lib/model/user"; 
import { connectToDb } from "@/lib/utils";
import { v4 as uuidv4 } from 'uuid';
const querystring = require('querystring');
const url = require('url');
import {home_path} from '@/lib/api_path';



export default async function handler(req, res) {
  await connectToDb(); // Establish connection (assuming pooling)

  switch (req.method) {
    case "POST":
      return getBalance(req, res);
    case "PUT":
      return empty_method(req, res);
    case "DELETE":
      return empty_method(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}


async function getBalance(req, res) {
  try {
    const userId = req.body.user_id;

    // Find user details
    const user_details = await User.findOne({ user_id: userId });
    
    // Check if the user exists
    if (!user_details) {
      return res.status(404).json({ 
        status: false,
        message: "User not found",
        errors: "User not found in the database"
      });
    }

    const balance = user_details.currency;

    return res.json({
      status: true,
      message: "Success",
      data: {
        balance: balance,
        user_id: userId
      },
      errors: ""
    });

  } catch (error) {
    // Error handling
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      errors: error.message
    });
  }
}


async function empty_method(req, res) {
  return res.json('nothing found...');
}
