const leadServices = require("../services/lead") ;
const userServices = require("../services/user")

const getMissedCall = async (req, res) => {
  try {
    const user = req.params.user;
    const status = req.body.DialCallStatus;
    const callerPhone = req.body.From;

    const missedStatuses = ["no-answer", "busy", "failed", "canceled"];

    if (missedStatuses.includes(status)) {
      await leadServices.createLead(user, status, "New Lead", callerPhone);
    }

    res.type("text/xml");
    return res.send("<Response></Response>");
  } catch (err) {
    console.log(err);

    res.type("text/xml");
    return res.send("<Response></Response>");
  }
};
const incomingCall = async (req, res) => {
  try {
    const id = req.params.user;
     console.log("call routes hit !!")
    const foundUser = await userServices.getUserById(id);

    res.type("text/xml");
   
    if (!foundUser || !foundUser.phoneNumber) {
      return res.send(`
        <Response>
          <Say>Sorry, this number is not available.</Say>
          <Hangup/>
        </Response>
      `);
    }

    return res.send(`
      <Response>
        <Dial 
          timeout="15"
          action="https://ai-powered-lcrp.onrender.com/api/webhook/${id}/missedcall"
          method="POST">
          ${foundUser.phoneNumber}
        </Dial>
      </Response>
    `);
  } catch (err) {
    console.log(err);

    res.type("text/xml");
    return res.send(`
      <Response>
        <Hangup/>
      </Response>
    `);
  }
};
module.exports ={ 
    getMissedCall,
    incomingCall
}