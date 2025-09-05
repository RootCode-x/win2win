const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlideManageSchema = new Schema(
  {
    text: {
      type: String,
      // required: true,
      trim: true,
    },

    slideImage: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

export const SlideManage = mongoose.models?.SlideManage || mongoose.model("SlideManage", SlideManageSchema);

