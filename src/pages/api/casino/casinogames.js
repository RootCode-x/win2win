import { Gamelist } from "@/lib/model/gamelist"; 
import { Casinotb } from "@/lib/model/casinotb"; 
import { connectToDb } from "@/lib/utils"; 
const crypto = require('crypto');
import { v4 as uuidv4 } from 'uuid';
const querystring = require('querystring');
const url = require('url');
const axios = require('axios');
import cors, { runMiddleware } from "@/lib/cors"; 

const apiUrl      = 'https://domain.com/';
const merchantId  = 'xxxxxxxxxxx';
const merchantKey = 'xxxxxxxxxxx';


export default async function handler(req, res) {
   
  await runMiddleware(req, res, cors);

  await connectToDb(); // Establish connection (assuming pooling)

  switch (req.method) {
    case "GET":
      if (req.query.gametypelist) {
        return gametypelist(req, res);
      } else if (req.query.providerlist) {       
        return providerlist(req, res);
      } else if (req.query.sortByProvider) {       
        return sortByProvider(req, res);
      } else if (req.query.sortByGame) {       
        return sortByGame(req, res);
      }else if (req.query.sportsbook) {       
        return sportsBook(req, res);
      } else if (req.query.searchGame) {       
        return searchGame(req, res);
      } else if (req.query.type) {       
        return casinoGameList(req, res);
      } else {      
        return getGames(req, res);
      }
    case "POST":
      return initGame(req, res);
    case "PUT":
      return updateGame(req, res);
    case "DELETE":
      return deleteGame(req, res);
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

async function handleGameList(req, res) {
    const currentPage = req.query.page;
    const time = Math.floor(Date.now() / 1000).toString();
    const nonce = crypto.randomBytes(16).toString('hex');
    const headers = {
      'X-Merchant-Id': merchantId,
      'X-Timestamp': time,
      'X-Nonce': nonce,
    };
    const requestParams = { page: currentPage };
  
    const { sign, queryString } = calculateXSign(headers, requestParams);
    const requestOptions = {
      headers: {
        'X-Merchant-Id': merchantId,
        'X-Timestamp': time,
        'X-Nonce': nonce,
        'X-Sign': sign,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
  
    try {
      const apiUrlWithQuery = url.format({ pathname: apiUrl, query: requestParams });
      const response = await axios.get(apiUrlWithQuery, requestOptions);
     
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch game list' });
    }
  }
  


 async function casinoGameList(req, res) {

 
      try {
        const type = req.query.type;
        const limit = 100;  
        let data = [];

        const names = [
          " Captain's Bounty",
          " Queen of Bounty",
          " Sweet Bonanza CandyLand",
          " Crazy Time",
          " Funky Time",
          " Mega Ball",
          " Mega Wheel", 
          // "MONOPOLY Live",
          // "Monopoly Big Baller",
          " Red Door Roulette", 
          " sic bo",
          " Aviator",
          " Super Andar Bahar",
          " Super Ace",
          " 7up7down",
          " Fortune Gems",
          " Fortune Gems 2",
          " Super Rich",
          " Lucky Coming",
          " Money Coming",
          " Wild Ace",
          " Mega Ace",
          " Crash Bonus",
          " Sic Bo",
          " SevenSevenSeven",
          //"Dragon & Tiger",
          " Wild Bounty Showdown",          
          " 32 Cards",
          " Auto Roulette 1",
          " VIP Roulette",
          " LUCKY 7",
          " Aviatrix",
          " Dice",
          " Mega Fishing",
          " Golden Land",
          " Color",
          " Go Rush",
          " Spaceman",
          "Double Fortune",
          " Ludo Express",
          " Ludo Quick",
          "Sicbo game",
          "Double Up",
       ];
      
       const nameSearchResults = await Gamelist.find({ 
              name: { $in: names }, 
              status: 1 
          })
          .sort({ name: 1 })
          .limit(50);

        data = nameSearchResults;
        const totalResults = data.length;
        res.json({
          totalResults,
          currentPage: 1,
          totalPages: Math.ceil(totalResults / limit),
          data,
        });

      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          res.status(error.response.status).json({
            status: 'error',
            message: error.response.data.message,
          });
        } else {
          res.status(400).json({
            status: 'error',
            message: error.message,
          });
        } 
      }




      
      const type = req.query.type;
      try {
        const result = await Gamelist.find({type:type, status: 1});
        res.json(result.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch game list' });
      } 
  }
  
   
  async function getGames(req, res) {
    const url = new URL(req.url);
    const type = url.searchParams.get("type"); // Handle optional query parameters
    const games = await Gamelist.find({ type, status: 1 });
    return res.json(games);
  }
  

  async function initGame(req, res) {

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { currency, game_uuid, player_id, player_name, session_id } = req.body;
  
    const time = Math.floor(Date.now() / 1000).toString();
    const nonce = crypto.randomBytes(16).toString('hex');
    const headers = {
      'X-Merchant-Id': merchantId,
      'X-Timestamp': time,
      'X-Nonce': nonce,
    };
    const requestParams = {
      currency,
      game_uuid,
      player_id,
      player_name,
      language: 'en',
      session_id,
      return_url: 'https://domain.co/',
    };
  
    const { sign, queryString } = calculateXSign(headers, requestParams);
  
    try {
      await connectToDb(); // Establish database connection (assuming MongoDB)
  
      // Save game init data to your database (if applicable)
      const newGameInit = {
        amount: 0,
        currency,
        game_uuid,
        player_id,
        session_id,
        type: 'init',
        comments: 'success',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
         
      await Casinotb.collection.insertOne({
          amount: 0,
          currency,
          game_uuid,
          player_id,
          session_id,
          type: 'init',
          comments: 'success',
          createdAt: new Date(),
          updatedAt: new Date(),
        });

  
      const apiUrlWithQuery = url.format({ pathname: `${apiUrl}/init` });
      const options = {
        method: 'POST',
        headers: {
          'X-Merchant-Id': merchantId,
          'X-Timestamp': time,
          'X-Nonce': nonce,
          'X-Sign': sign,
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: queryString,
      };
      const response = await axios(apiUrlWithQuery, options);
      return res.json(response.data);

    } catch (error) {
      let errorMessage = 'Failed to initialize game';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      return res.status(error.response?.status || 500).json({ error: errorMessage });
    }
  }
 
 
 
  async function updateGame(req, res) {
    try {
      const { id } = req.query; // Extract ID from query parameters
      const updateData = req.body;
      const updatedGame = await Gamelist.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedGame) {
        return res.status(404).json({ error: "Game not found" });
      }
      return res.json(updatedGame);
    } catch (err) {
      console.error("Error updating game:", err);
      return res.status(500).json({ error: "Failed to update game" });
    }
  }
  
  async function deleteGame(req, res) {
    try {
      const { id } = req.query;   
      return res.status(204).json({ message: "Game deleted" }); // No content response
    } catch (err) {
      console.error("Error deleting game:", err);
      return res.status(500).json({ error: "Failed to delete game" });
    }
  }


  async function providerlist(req, res) {
    try {
        const uniqueProviders = await Gamelist.aggregate([
        {
          $group: {
            _id: '$provider',
          },
        },
        {
          $sort: {
            _id: 1, // 1 for ascending order, -1 for descending order
          },
        },
      ]);
      // Extract only the provider names from the aggregation result
        const providerNames = uniqueProviders.map((item) => item._id);
        res.status(200).json(providerNames);       
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went.' });
    }
  }


  async function sortByProvider(req, res) {
    const search = req.query.sortByProvider;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20; // Set default limit per page
  
    try {
      const skip = (page - 1) * limit;
  
      // Search by provider name
      const data = await Gamelist.find({
        provider: { $regex: new RegExp(search, 'i') },
        status: 1,
      })
        .sort({ name: 1 })
        .skip(skip) // Skip the previous pages' data
        .limit(limit); // Limit the results to current page
  
      const totalResults = await Gamelist.countDocuments({
        provider: { $regex: new RegExp(search, 'i') },
        status: 1,
      });
  
      res.json({
        totalResults,
        currentPage: page,
        totalPages: Math.ceil(totalResults / limit),
        data,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }


  async function sortByGame(req, res) {

    const search = req.query.sortByProvider;
    const sortByGame = req.query.sortByGame;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20; // Set default limit per page
  
    try {
      const skip = (page - 1) * limit;
  
      // Search by provider name
      const data = await Gamelist.find({
        provider: { $regex: new RegExp(search, 'i') },
        status: 1,
        type: sortByGame,
      })
        .sort({ name: 1 })
        .skip(skip) // Skip the previous pages' data
        .limit(limit); // Limit the results to current page
  
      const totalResults = await Gamelist.countDocuments({
        provider: { $regex: new RegExp(search, 'i') },
        status: 1,
      });
  
      res.json({
        totalResults,
        currentPage: page,
        totalPages: Math.ceil(totalResults / limit),
        data,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  
  async function sportsBook(req, res) {
    const search = req.query.sortByProvider || '';  // For filtering by provider name, if needed
    const sortBySport = req.query.sortBySport || '';  // For filtering by sport category, if needed
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20; // Set default limit per page
  
    // Static sportsbook data
    const allSportsData_back = [
      {
        _id: "66b4720d789e19c6b6f20ebd",
        uuid: "2debb86bd2ac499c9c1137550f86939d",
        name: "Cricket",
        provider: "BetProvider1",
        category: "sports",
        image: "/images/providersnew/Cricket.png",
        status: "active",
      },
      {
        _id: "66b47225789e19c6b6f20eb5",
        uuid: "6d5ad130c9b64c7789a37f25253b60ca",
        name: "Football",
        provider: "BetProvider2",
        category: "sports",
        image: "/images/providersnew/Football.png",
        status: "active",
      },
      {
        _id: "66b47225789e19c6b6f20eee",
        uuid: "bd15e6de5ef546839d431d4e2acbce25",
        name: "Badminton",
        provider: "BetProvider3",
        category: "sports",
        image: "/images/providersnew/Badminton.png",
        status: "active",
      },
      // ... Add more static data here as needed
    ];

    const allSportsData = [''];

    // Filter and paginate the data
    const filteredData = allSportsData.filter(sport => {
      const matchesProvider = search ? sport.provider.toLowerCase().includes(search.toLowerCase()) : true;
      const matchesCategory = sortBySport ? sport.category.toLowerCase().includes(sortBySport.toLowerCase()) : true;
      return matchesProvider && matchesCategory;
    });
  
    const totalResults = filteredData.length;
    const totalPages = Math.ceil(totalResults / limit);
    const paginatedData = filteredData.slice((page - 1) * limit, page * limit);
  
    // Return paginated static data
    res.json({
      totalResults,
      currentPage: page,
      totalPages,
      data: paginatedData,
    });
  }
  

  async function searchGame(req, res) {
    
    const search = req.query.searchGame;
    try {
       
      const limit = 100;  
      let data = [];
      // Search by name
      const nameSearchResults = await Gamelist.find({
        name: { $regex: new RegExp(search, 'i') },
        status: 1
      }).limit(limit);
  
      if (nameSearchResults.length > 0) {
        data = nameSearchResults;
      } else {
        // If no results found by name, search by type
        const typeSearchResults = await Gamelist.find({
          type: { $regex: new RegExp(search, 'i') },
          status: 1
        }).limit(limit);
        data = typeSearchResults;
      }
      const totalResults = data.length;
      res.json({
        totalResults,
        currentPage: 1,
        totalPages: Math.ceil(totalResults / limit),
        data,
      });
  
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        res.status(error.response.status).json({
          status: 'error',
          message: error.response.data.message,
        });
      } else {
        res.status(400).json({
          status: 'error',
          message: error.message,
        });
      } 
    }
  }


  async function gametypelist(req, res) {
    try {
      const uniqueTypes = await Gamelist.aggregate([
      {
          $group: {
            _id: '$type',
          },
        },
        {
          $sort: {
            _id: 1, // 1 for ascending order, -1 for descending order
          },
        },
      ]);
        const gameType = uniqueTypes.map((item) => item._id);
        res.status(200).json(gameType);       
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went.' });
    }
  }


