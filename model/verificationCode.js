const mongoose = require("mongoose");
const { Schema } = mongoose; 

const verificationSchema = new Schema({
    user: {
         type: Schema.Types.ObjectId,
      ref: "user", 
      required: true,
    },
    code: {
        type: String ,
        required: true 
    },
    expiredTime: {
        type: Date 
    }
},
 { timestamps: true },
) ;


const verificationModel = mongoose.model("verification_code", verificationSchema) ;

module.exports = verificationModel