import { User } from "@/lib/model/user"; 
import { SlideManage } from "@/lib/model/SlideManage"; 
import { connectToDb } from "@/lib/utils";

const Promise = require('promise');


  export default async function handler(req, res) {
    // res.setHeader('Access-Control-Allow-Origin', '*'); 
    // res.setHeader('Access-Control-Allow-Methods', '*'); 
    // res.setHeader('Access-Control-Allow-Headers', '*'); 
    await connectToDb();
    switch (req.method) {
      case "GET":
        if (req.query.slidelist) {       
          return slidelist(req, res);
        }else if (req.query.referrerId) {       
          return searchSponsor(req, res);
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

  async function slidelist(req, res) {
      try {
        const result =  await SlideManage.find().sort({ _id: -1 });
        return res.json(result);
      } catch (error) {
        console.error('Error fetching agents:', error);
        return res.json(error);
      }
  }

  async function searchSponsor(req, res) {
      try {
        const result =  await User.findOne({user_id : req.query.referrerId});
        return res.json(result);
      } catch (error) {
        console.error('Error fetching agents:', error);
        return res.json(error);
      }
  }

  async function empty_method(req, res) {
    return res.json('nothing found');
  }

