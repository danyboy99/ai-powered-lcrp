const mongoose = require("mongoose") ; 
const {Schema}  = mongoose
const leadSchema = new Schema({
    user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required:true
        },
    source:{
        type:String,
    },
    status:{
        type:String,
        required:true,
        enum:["New Lead", "Contacted", "Quote Sent","Won", "Lost"]
    },
    phoneNumber:{
        type:String,
        required:true,
    }
},
{timestamp:true}
) ;


module.exports = mongoose.model("lead", leadSchema)


