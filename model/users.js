const mongoose = require("mongoose") ; 
const {Schema}  = mongoose
const userSchema = new Schema({
    fullName:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    brandName:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String
    },
    isVerified:{
        type: Boolean,
        default: false
    }
},
{timestamp:true}
) ;



module.exports = mongoose.model("user", userSchema)