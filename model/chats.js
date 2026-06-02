const mongoose = require("mongoose");
const { Schema } = mongoose;


const chatSchema = new Schema({
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    phoneNumber:{
        type:String,
        required: true,
    },
    content:{
      type: String,
      required: true,
      trim: true,
    },

},
{
    timestamps: true,
  }
)

const chat= mongoose.model("chat", chatSchema);

module.exports = chat;
