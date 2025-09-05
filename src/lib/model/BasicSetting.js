const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {

    status: {
      type: String,
    },

    // basic Setting:  site_title, site_logo, site_favicon, admin_login_cover, site_email, support_email, support_number, site_currency, site_timezone,

    site_title: {
      type: String,
      // required: true,
      trim: true,
    },

    site_logo: {
      type: String,
    },

    site_favicon: {
      type: String,
    },

    // admin_login_cover: {
    //   type: String,
    // },

    site_email: {
      type: String,
    },

    support_email: {
      type: String,
    },
    
    support_number: {
      type: String,
    },

    site_currency: {
      type: String,
    },

    site_timezone: {
      type: String,
    },
   
    sendmoney_min_limit: {
      type: String,
    },
    
    sendmoney_max_limit: {
      type: String,
    },

    send_money_charge: {
      type: String,
    },

    wallet_exchange_charge: {
      type: String,
    },

    user_bonus: {
      type: String,
    },
    
    signup_bonus: {
      type: String,
    },
   
    email_verification: {
      type: String,
    },

    tpin_verification: {
      type: String,
    },
    
    account_creation: {
      type: String,
    },
    
    user_deposit: {
      type: String,
    },
    
    user_withdraw: {
      type: String,
    },
    
    user_referral: {
      type: String,
    },
    

    notice_img: {
      type: String,
    },

    title: {
      type: String,
    },

    description: {
      type: String,
    },

    // PromoCode:
    // promo_code, campaign: first sign-up, Referral, Percentage, Fixed amount, Special Day, Offer | currency amount, expire_date, limit

    promo_code_type: {
      type: String,
    }, 
    
    promo_code: {
      type: String,
    },

    campaign: {
      type: String,
    },

    currency: {
      type: String,
    },

    amount: {
      type: String,
    },

    expire_date: {
      type: String,
    },

    limit: {
      type: Number,
    },

    // AffiliateLink 

    aff_link: {
      type: String,
    },

  },

  {
    timestamps: true,
  }
);

const BasicSetting = mongoose.model("basicSetting", UserSchema);

module.exports = BasicSetting;
