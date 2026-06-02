const leadServices = require("../services/lead") ;

const getMissedCall = async (req,res) =>{
    try{
        const user = req.params ;
        const status = req.body.DialCallStatus;
        const callerPhone = req.body.From;

            const missedStatuses = ["no-answer", "busy", "failed", "canceled"];
        
            if (missedStatuses.includes(status)) {
                let newLead =  await leadServices.createLead(user,status,"New Lead",callerPhone) ;
            }
            return res.json({
                status:"done",
            })
    }catch(err){
        return res.json({
            status:"failed",
            err
        })
    }
}


module.exports ={ 
    getMissedCall
}