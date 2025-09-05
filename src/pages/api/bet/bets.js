import { User } from "@/lib/model/user"; 
import { Casinotb } from "@/lib/model/casinotb"; 
import { SlotegratorGames } from "@/lib/model/SlotegratorGames"; 
import { connectToDb } from "@/lib/utils";

const Promise = require('promise');

  export default async function handler(req, res) {
    await connectToDb();
    switch (req.method) {
      case "GET":
        if (req.query.bettingHistory) {       
          return bettingHistory(req, res);
        }  else {      
          return empty_method(req, res);
        }
      case "POST":
        if (req.body.posttype == "deposit_now") {       
          return empty_method(req, res);
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


  async function bettingHistory(req, res) {
    try {
      const { player_id, startDate, endDate } = req.query;
  
      if (!player_id) {
        return res.status(400).json({ error: 'Player ID is required' });
      }

      const filter = { player_id };
  
      if (startDate || endDate) {
        filter.createdAt = {};
  
        if (startDate) {
          filter.createdAt.$gte = new Date(startDate); 
        }
        if (endDate) {
          const endOfDay = new Date(endDate);
          endOfDay.setHours(23, 59, 59, 999);
          filter.createdAt.$lte = endOfDay;
        }
      } else {
       
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0); 
        filter.createdAt = { $gte: startOfDay };
      }
  
      const result = await SlotegratorGames.find(filter).sort({ createdAt: -1 });
  
      return res.json(result);
  
    } catch (error) {
      console.error('Error fetching betting history:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

  async function empty_method(req, res) {
    return res.json('nothing found');
  }

