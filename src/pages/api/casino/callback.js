import { Casinotb } from "@/lib/model/casinotb"; 
import { User } from "@/lib/model/user"; 
import { connectToDb } from "@/lib/utils"; 
import { Gamelist } from "@/lib/model/gamelist"; 
const crypto = require('crypto');
import { v4 as uuidv4 } from 'uuid';
const querystring = require('querystring');
const url = require('url');
const axios = require('axios');


const apiUrl      = 'https://domain.com/api/';
const merchantId  = 'xxxxxxxxxxx';
const merchantKey = 'xxxxxxxxxxx';


export default async function handler(req, res) {
  await connectToDb(); 

  switch (req.method) {
    case "GET":
      if (req.query.gametypelist) {
        return empty_method(req, res);
      } else if (req.query.gameSync) {
        return gameSync(req, res);
      } else {  
        return selfValidate(req, res);
      }
    case "POST":
      return callBack(req, res);
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



  async function initGame(req, res) {

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { currency, game_uuid, player_id, player_name, session_id } = req.body;
    console.log('received in backend', req.body);
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
      return_url: 'https://domain.co',
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
      console.log(response.data);
      return res.json(response.data);
    } catch (error) {
     // console.error(error);
      let errorMessage = 'Failed to initialize game';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      return res.status(error.response?.status || 500).json({ error: errorMessage });
    }
  }
 


  async function callBack(req, res) {
      
    const { action } = req.body; 

    const headers = {
      'X-Merchant-Id': req.headers['x-merchant-id'], // Replace with the actual header name
      'X-Timestamp': req.headers['x-timestamp'],
      'X-Nonce': req.headers['x-nonce'],
    };
    const XSign = req.headers['x-sign'];
 
    const { amount, currency, game_uuid, player_id, transaction_id, session_id , type, freespin_id, quantity, round_id, finished} = req.body; 
  
    const requestParams = { ...req.body, ...headers };
    const { sign, queryString } = calculateXSign(headers, requestParams)
  
    if (action !== 'rollback') {
      if (XSign !== sign) {
        return res.status(200).json({
          error_code: "INTERNAL_ERROR",
          error_description: "Invalid sign",
        });     
      } 
    }

    if (action === 'balance') {
        try{
          const { currency, player_id, session_id, action } = req.body;        
                  
          const user = await User.findById(player_id).select('name email currency');  
          if (!user) {
            return  res.status(200).json({
              error_code: "INTERNAL_ERROR",
              error_description: "This user does not exist in our system.",
            });
          }else{
            if(user.currency > 0){
                const balance_result = {
                  balance: user.currency.toFixed(4),
                  currency: "EUR",
                };          
                return   res.status(200).json(balance_result);
            }else{
              return  res.status(200).json({
                error_code: "INSUFFICIENT_FUNDS",
                error_description: "Not enough money to continue playing.",
              });
            }          
          }
        } catch (error) {
          return res.status(200).json({
            error_code: "INTERNAL_ERROR",
            error_description: "This user does not exist in our system.",
          });
        }
    } else if (action === 'win') {
      try {          
        const { amount, currency, game_uuid, player_id, transaction_id, session_id , type, freespin_id, quantity, round_id, finished} = req.body; 
       // const userObjectID = new ObjectID(player_id);
          
          const user = await User.findById(player_id).select('name email currency');  

          if (!user) {
            return   res.status(200).json({
              error_code: "INTERNAL_ERROR",
              error_description: "This user does not exist in our system.",
            });        
          }

          if (amount <= 0) {
            return  res.status(200).json({
              balance: user.currency.toFixed(4),
              transaction_id: transaction_id,
            });        
          }

          const checkDuplicate = await Casinotb.find({
            $and: [            
              { transaction_id: transaction_id },
              { game_uuid: game_uuid },
              { player_id: player_id },
              { type: type},
              { session_id: session_id }
            ]
          });

          if (checkDuplicate.length === 0) { const testt = 0;} else{
            return  res.status(200).json({
              balance: user.currency.toFixed(4),
              transaction_id: transaction_id,
            });        
          }        

       
            const currentBalance = user.currency;  
            const updatedBalance = parseFloat(currentBalance) + parseFloat(amount);
            user.currency = updatedBalance.toFixed(4);
           
            await user.save();    
            
            await Casinotb.collection.insertOne({ amount: amount,currency: currency,game_uuid: game_uuid,player_id: player_id,transaction_id: transaction_id,session_id: session_id,type: type,freespin_id: freespin_id,quantity: quantity,round_id: round_id,finished: finished, comments: 'success', createdAt: new Date(),updatedAt: new Date()});

            const user_update = await User.findById(player_id).select('name email currency');  
            const response = {
              balance: user_update.currency.toFixed(4),
              transaction_id: uuidv4(),
            };
            return    res.status(200).json(response);         
                       
        } catch (error) {
          return   res.status(200).json({
            error_code: "INTERNAL_ERROR",
            error_description: "Something went wrong.",
          });    
        }
    } else if (action === 'bet') {
      try {                          
        const { amount, currency, game_uuid, player_id, transaction_id, session_id , type, freespin_id, quantity, round_id, finished,} = req.body; 
        //  const userObjectID = new ObjectID(player_id);
          
          const user = await User.findById(player_id).select('name email currency');     
  
          if (!user) {
            return   res.status(200).json({
              error_code: "INTERNAL_ERROR",
              error_description: "This user does not exist in our system.",
            });        
          }

          if (amount <= 0) {
            return  res.status(200).json({
              balance: user.currency.toFixed(4),
              transaction_id: transaction_id,
            });        
          }

          
          const checkDuplicate = await Casinotb.find({
            $and: [
              { transaction_id: transaction_id },
              { game_uuid: game_uuid },
              { player_id: player_id },
              { type: type},
              { session_id: session_id }
            ]
          });

          if (checkDuplicate.length === 0) { const testt = 0;} else{
            return  res.status(200).json({
              balance: user.currency.toFixed(4),
              transaction_id: transaction_id,            
            });        
          }         
        
          const currentBalance = user.currency;          
          const updatedBalance = currentBalance - amount;
          if (updatedBalance >= 0) { 
              user.currency = updatedBalance.toFixed(4);           
              await user.save();
              await Casinotb.collection.insertOne({ amount: amount,currency: currency,game_uuid: game_uuid,player_id: player_id,transaction_id: transaction_id,session_id: session_id,type: type,freespin_id: freespin_id,quantity: quantity,round_id: round_id,comments: 'success', finished: finished,createdAt: new Date(),updatedAt: new Date()});

              const user_update = await User.findById(player_id).select('name email currency');  
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
    } else if (action === 'refund') {
       try {   
        const { amount, currency, game_uuid, player_id, bet_transaction_id, session_id , type, freespin_id, quantity, round_id, finished,} = req.body; 

        const user = await User.findById(player_id).select('name email currency');  

          if (!user) {
            return   res.status(200).json({
              error_code: "INTERNAL_ERROR",
              error_description: "This user does not exist in our system.",
            });        
          }
 
          if (amount <= 0) {
            return  res.status(200).json({
              balance: user.currency.toFixed(4),
              transaction_id: bet_transaction_id,
            });        
          }
       
          
          const betTransactionCheck = await Casinotb.find({
            $and: [
              { transaction_id: bet_transaction_id },
              { game_uuid: game_uuid },
              { player_id: player_id },
              { type: 'bet' },
              { session_id: session_id }
            ]
          }).sort({ createdAt: -1 }).limit(1);

          
      
          if (betTransactionCheck.length === 0) {
            return  res.status(200).json({
              balance: user.currency.toFixed(4),
              transaction_id: bet_transaction_id,              
            });        
          }
        
          const checkDuplicate = await Casinotb.find({
            $and: [
              { transaction_id: bet_transaction_id },
              { type: type },
              { session_id: session_id }
            ]
          });  
          
        
          if (checkDuplicate.length === 0) { const testt = 0;} else{
            return  res.status(200).json({
              balance: user.currency.toFixed(4),
              transaction_id: bet_transaction_id,              
            });        
          }
        
          const currentBalance = user.currency;         
          const updatedBalance = parseFloat(currentBalance) + parseFloat(amount);          
          user.currency = updatedBalance.toFixed(4);             
          await user.save();    
            
          await Casinotb.collection.insertOne({ amount: amount,currency: currency,game_uuid: game_uuid,player_id: player_id,transaction_id: bet_transaction_id,session_id: session_id,type: type,freespin_id: freespin_id,quantity: quantity,round_id: round_id,finished: finished,comments: 'success', createdAt: new Date(),updatedAt: new Date()});

          const user_update = await User.findById(player_id).select('name email currency');  
          const response = {
            balance: user_update.currency.toFixed(4),
            transaction_id: uuidv4(),
          };
          return   res.status(200).json(response);         
        
          
        } catch (error) {
          return  res.status(200).json({
            error_code: "INTERNAL_ERROR",
            error_description: "Something went wrong.",
          });    
        }    
    } else if (action === 'rollback') {
       try {   
        const { currency,game_uuid,player_id,transaction_id,rollback_transactions,session_id,type} = req.body; 
    
        const user = await User.findById(player_id).select('name email currency');  

          if (!user) {
            return   res.status(200).json({
              error_code: "INTERNAL_ERROR",
              error_description: "This user does not exist in our system.",
            });        
          }
             
          const checkDuplicate = await Casinotb.find({
            $and: [
              { transaction_id: transaction_id },
              { type: type },
              { session_id: session_id }
            ]
          });  
          
          const parsedRollbackTransactions = rollback_transactions.map((transaction) => transaction.transaction_id);
          if (checkDuplicate.length === 0) { const testt = 0;} else{         
            return  res.status(200).json({
              balance: user.currency.toFixed(4),
              transaction_id: transaction_id,         
              rollback_transactions : parsedRollbackTransactions     
            });        
          }
        
          
         // const parsedRollbackTransactions = [];
          if (Array.isArray(rollback_transactions)) {
            for (const transaction of rollback_transactions) {
              const { action, amount, transaction_id, type } = transaction;
          
              try {
                if (type === 'bet' || type === 'win') {
                  const user = await User.findById(player_id);
                  if (!user) {
                    return   res.status(200).json({
                      error_code: "INTERNAL_ERROR",
                      error_description: "This user does not exist in our system.",
                    });      
                  }
          
                  const currentBalance = parseFloat(user.currency);
                  const updatedBalance = type === 'bet' ? currentBalance + parseFloat(amount) : currentBalance - parseFloat(amount);
                  const users_balance  = updatedBalance.toFixed(4);
                  await Casinotb.findOneAndUpdate({player_id: player_id, transaction_id: transaction_id, type: type}, {comments: action});

                  await User.findByIdAndUpdate(player_id, { currency: users_balance });

               //   parsedRollbackTransactions.push({ transaction_id });
                }
              } catch (error) {
                return  res.status(200).json({
                  error_code: "INTERNAL_ERROR",
                  error_description: "Something went wrong.",
                });    
              }
            }
          }
        
          await Casinotb.collection.insertOne({ currency: currency,game_uuid: game_uuid,player_id: player_id,transaction_id: transaction_id,session_id: session_id, comments: 'success', type: type,createdAt: new Date(),updatedAt: new Date()});


          const user_update = await User.findById(player_id).select('name email currency');  
          const response = {
            balance: user_update.currency.toFixed(4),
            transaction_id: uuidv4(),
            rollback_transactions : parsedRollbackTransactions     
          };
          return   res.status(200).json(response);         
        
          
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





  
  async function selfValidate(req, res) {
    
    const nonce = crypto
    .createHash('md5')
    .update(crypto.randomBytes(16))
    .digest('hex');

    
    const time = Math.floor(Date.now() / 1000).toString();
    const headers = {
      'X-Merchant-Id': merchantId,
      'X-Timestamp': time,
      'X-Nonce': nonce,
    };

    const { amount, game_uuid, player_id, round_id, transaction_id, session_id,type,createdAt} = req.query;
    const requestParams  = {
      success: true,
      log: {
        amount: amount,
        currency: "EUR",
        game_uuid: game_uuid,
        player_id: player_id,
        transaction_id: transaction_id,
        session_id: session_id,
        type: type,
        freespin_id: null,
        quantity: null,
        round_id: round_id,
        finished: null,
        createdAt: createdAt,
        updatedAt: createdAt
      }
    };
  
  

    const { sign, queryString } = calculateXSign(headers, requestParams)

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
      data: queryString
    };
    try {
     
      const apiUrlWithQuery = url.format({ pathname: `https://domain.com`});
      const response = await axios(apiUrlWithQuery, options);

      res.json(response.data);
    } catch (error) {
      res.status(500).json({
        error:
          error.message
      });
    }


  }


  
  async function gameSync(req, res) {
   
    try {   
      await connectToDb(); 
      const nonce = crypto.randomBytes(16).toString('hex');
      const currentPage = req.query.page;
      const time = Math.floor(Date.now() / 1000).toString();
      const headers = {
        'X-Merchant-Id': merchantId,
        'X-Timestamp': time,
        'X-Nonce': nonce,
      };
      
      const requestParams = {
        page: 1,
      };

      const { sign } = calculateXSign(headers, requestParams)
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
     
        const apiUrlWithQuery = url.format({
          pathname: apiUrl, query: requestParams
        });
        const response = await axios.get(apiUrlWithQuery, requestOptions); 
      
        // New game insert metod
        const items = response.data.items;   

        console.log('fetched page'+ currentPage  + ' fetched data ' + currentPage );

        // New game insert metod
        res.status(200).json(response + 'data successfully fetched!');       
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went.' });
      }
  }

  
  async function empty_method(req, res) {
    return res.json('nothing found');
  }
  