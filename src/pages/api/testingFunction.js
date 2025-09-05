import { User } from "@/lib/model/user"; 
import { SlideManage } from "@/lib/model/SlideManage"; 
import { connectToDb } from "@/lib/utils";
import { Sportsbooktb } from "@/lib/model/sportsbooktb"; 
const Promise = require('promise');


  export default async function handler(req, res) {

    await connectToDb();
    switch (req.method) {
      case "GET":
        if (req.query.sportTest) {       
          return sportTest(req, res);
        } else if (req.query.depositMethod) {       
          return empty_method(req, res);
        } else {      
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



  async function sportTest(req, res) {
    
      try {
        const betslip_id = req.query.betslip_id;
        const player_id  = req.query.player_id;

    
    // Validation
    if (!betslip_id || !player_id) {
      return res.status(400).json({
        error_code: "BAD_REQUEST",
        error_description: "betslip_id and player_id are required parameters."
      });
    }

    // Fetch matching documents before the update (for checking if they exist)
    const checkDuplicate = await Sportsbooktb.find({
      betslip_id: betslip_id,
      player_id: player_id,
    });

    if (checkDuplicate.length === 0) {
      return res.status(404).json({
        error_code: "NOT_FOUND",
        error_description: "No matching records found.",
      });
    }

    // Update matching documents
    const updateResult = await Sportsbooktb.updateMany(
      { betslip_id: betslip_id, player_id: player_id },
      { $set: { status: 'settled' } }
    );

    // Check if the update was successful
    if (updateResult.modifiedCount === 0) {
      return res.status(500).json({
        error_code: "UPDATE_FAILED",
        error_description: "Failed to update the records.",
      });
    }

    // Fetch the updated documents
    const updatedDocuments = await Sportsbooktb.find({
      betslip_id: betslip_id,
      player_id: player_id,
    });

    return res.status(200).json(updatedDocuments);

      
      } catch (error) {
        console.error('Error fetching agents:', error);
        return res.json(error);
      }
  }



  async function empty_method(req, res) {
    return res.json('nothing found');
  }

