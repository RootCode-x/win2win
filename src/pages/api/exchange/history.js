import { User } from "@/lib/model/user"; 
import { Casinotb } from "@/lib/model/casinotb"; 
import { Exchange } from "@/lib/model/exchange"; 
import { connectToDb } from "@/lib/utils";

const Promise = require('promise');

  export default async function handler(req, res) {
    await connectToDb();
    switch (req.method) {
      case "GET":
        if (req.query.exchangeHistory) {       
          return exchangeHistory(req, res);
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

  async function exchangeHistory(req, res) {
    try {
      const { player_id, startDate, endDate, page = 1, limit = 10 } = req.query; // Extract query parameters
      const pageNumber = parseInt(page, 10); // Default to page 1 if invalid
      const pageSize = parseInt(limit, 10); // Default to 10 items per page
      const skip = (pageNumber - 1) * pageSize;
  
      if (!player_id) {
        return res.status(400).json({ error: "Player ID is required" });
      }
  
      // Prepare filter object
      const filter = { user_id: player_id };
  
      if (startDate && endDate) {
        filter.createdAt = {};
        if (startDate) {
          filter.createdAt.$gte = new Date(startDate);
        }
        if (endDate) {
          const endOfDay = new Date(endDate);
          endOfDay.setHours(23, 59, 59, 999); // Include the full day for endDate
          filter.createdAt.$lte = endOfDay;
        }
      } else {
        // Default to yesterday's data if no date range is provided
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0); // Reset to 00:00:00
        const startOfYesterday = new Date(startOfToday);
        startOfYesterday.setDate(startOfToday.getDate() - 1);
        filter.createdAt = { $gte: startOfYesterday, $lt: new Date() };
      }
  
      // Query the database
      const result = await Exchange.find(filter)
        .sort({ createdAt: -1 }) // Sort in descending order of creation
        .skip(skip)
        .limit(pageSize);
  
      // Count total documents matching the filter
      const totalCount = await Exchange.countDocuments(filter);
  
      // Send the response with pagination details
      return res.json({
        data: result,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
        currentPage: pageNumber,
      });
    } catch (error) {
      console.error("Error fetching exchange history:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  


  async function empty_method(req, res) {
    return res.json('nothing found');
  }

