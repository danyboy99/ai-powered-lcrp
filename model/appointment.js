const mongoose = require("mongoose") ;
const {Schema} = mongoose ;

const appointmentSchema= Schema({
     user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required:true
        },
    phoneNumber: {
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    address:{
        type:String
    },
    issue:{
        type:String
    },
    appointmentDate:{
        type:String
    },
    status:{
        type:String,
        default:"Pending",
        enum:["Pending", "Approved", "Rejected"]
    }
},
{
    timestamps:true
}
)


module.exports = mongoose.model("appointment", appointmentSchema) ;