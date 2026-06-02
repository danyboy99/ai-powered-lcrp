const express = require("express") ; 
const webhookController = require("../controller/webhook") ;

const router = express.Router() ;

router.post("/:user/missedcall", webhookController.getMissedCall) ;

router.post("/:user/incomingcall", webhookController.incomingCall) ;




















module.exports = router