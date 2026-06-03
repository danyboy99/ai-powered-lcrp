const mongoose = require("mongoose");
const { Schema } = mongoose;


const chatSchema = new Schema({
   user:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required:true
      },
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    phoneNumber:{
        type:String,
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
