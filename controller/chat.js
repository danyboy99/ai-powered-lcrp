const chatServices = require("../services/chat");
const FAQServices = require("../services/faq") ;

const askAi = async (req,res) =>{
    try{
        const {prompt, phoneNumber, userId} = req.body ;
        console.log("it hit the ask routes")
        const userChatSaved = await chatServices.createChat(userId,"user",phoneNumber,prompt) ;
        // generate response form ai 
        console.log("start ai response") ;
        const aiResponse = await chatServices.generateResponse(prompt,userId) ; 
        console.log("ai response concluded")

        const aiChatSaved = await chatServices.createChat(userId,"assistant", phoneNumber,aiResponse.response) ; 
        return res.json({
            status:"success",
            data: aiChatSaved
        })
    }catch(err){
        console.log("error", err) 
        return res.json({
            status:"Failed",
            error: err.message
        })
    }
}
const getCustomerChat = async (req,res) =>{
    try{
        const {userId,phoneNumber} = req.params
        const foundChat = await chatServices.getChatByCustomerphoneNumber(userId,phoneNumber) ;
        return res.json({
            status:"success",
            data: foundChat
        })
    }catch(err){
       console.log("error", err) 
        return res.json({
            status:"Failed",
            error: err.message
        })
    }
}

const get_ChatNumbers = async (req,res) =>{
    const successMsg = req.flash("success");
    const errMsg = req.flash("error"); 
    const user = req.user
    const foundChats = await chatServices.getChatNumbers(user._id) ;
    res.render("screens/chatnumbers", {
        user,
        hasErr: errMsg.length > 0,
        hasSuccess: successMsg.length > 0,
        errMsg: errMsg,
        successMsg: successMsg,
        hasChatNumber : foundChats.length > 0,
        foundChats
    })
}

const get_SingleChats = async (req,res) =>{
     const successMsg = req.flash("success");
    const errMsg = req.flash("error"); 
    const user = req.user
    const {phoneNumber} = req.params ;
    const foundChat = await chatServices.getChatByCustomerphoneNumber(user._id,phoneNumber)
    res.render("screens/customerchat", {
        user,
        hasErr: errMsg.length > 0,
        hasSuccess: successMsg.length > 0,
        errMsg: errMsg,
        successMsg: successMsg,
        foundChat
    })
}
const chatWithAi = async (req,res) =>{
      const successMsg = req.flash("success");
    const errMsg = req.flash("error"); 
    const {phoneNumber,userId} = req.params ;
    res.render("screens/askai", {
        hasErr: errMsg.length > 0,
        hasSuccess: successMsg.length > 0,
        errMsg: errMsg,
        successMsg: successMsg,
        phoneNumber,
        userId
    })
}
module.exports = {
    askAi,
    getCustomerChat,
    get_ChatNumbers,
    get_SingleChats,
    chatWithAi
}