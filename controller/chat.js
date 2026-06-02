const chatServices = require("../services/chat");
const FAQServices = require("../services/faq") ;

const askAi = async (req,res) =>{
    try{
        const {prompt, email, licensedKey} = req.body ;
        console.log("it hit the ask routes")
        const userChatSaved = await chatServices.createChat("user", email, licensedKey, prompt) ;
        // generate response form ai 
        console.log("start ai response") ;
        const aiResponse = await generateResponse(prompt,licensedKey) ; 
        console.log("ai response concluded")

        const aiChatSaved = await chatServices.createChat("assistant", email, licensedKey, aiResponse.response) ; 
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
        const {phoneNumber} = req.params
        const foundChat = await chatServices.getChatByCustomerEmail(phoneNumber) ;
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



module.exports = {
    askAi,
    getCustomerChat,
}