const express = require("express") ; 
const webhookController = require("../controller/webhook") ;

const router = express.Router() ;

router.post("/:user/missedcall", webhookController.getMissedCall) ;





















module.exports = router