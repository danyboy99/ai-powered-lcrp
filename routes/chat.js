const express = require("express") ;
const chatController = require("../controller/chat") ;
const auth = require("../middleware/auth") ;

const router = express.Router() ;


router.get("/enquiries/:userId/:phoneNumber", chatController.chatWithAi )
router.get("/chats", auth.isUserLoggedIn, chatController.get_ChatNumbers) ;
router.get("/cutomer-chat/:phoneNumber", auth.isUserLoggedIn, chatController.get_SingleChats) ;
router.get("/getchat/:userId/:phoneNumber", chatController.getCustomerChat) ;
router.post("/ask", chatController.askAi) ;














module.exports = router