const Chat = require("../model/chats") ;
const FAQServices = require("./faq") ;
require("dotenv").config();

let client;

async function getOpenRouterClient() {
  if (!client) {
    const { OpenRouter } = await import("@openrouter/sdk");

    client = new OpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
      httpReferer: "https://ai-receptionist-nj3f.onrender.com/",
      appTitle: "Omni AI",
    });
  }

  return client;
}

const generateResponse = async (prompt, user) => {
  try {
    const FALLBACK = "I don't have an answer for that question at the moment.";

    const foundFAQ = await FAQServices.getFAQByUserId(user);

    if (!foundFAQ || foundFAQ.length === 0) {
      return {
        status: "success",
        response: FALLBACK,
      };
    }

    const faqContext = foundFAQ
      .map((faq, index) => {
        return `FAQ ${index + 1}
Question: ${faq.question}
Answer: ${faq.answer}`;
      })
      .join("\n\n");

    const openrouter = await getOpenRouterClient();

    const response = await openrouter.chat.send({
      chatRequest: {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a friendly AI receptionist for a business.

You must help customers using only the FAQ context provided.

Important behavior:
- If the user greets you, greets them warmly and ask how you can help.
- If the user says thank you, okay, alright, bye, or sends a polite closing message, respond naturally and kindly.
- If the user asks a business-related question, answer using only the FAQ context.
- You may rephrase the FAQ answer in a natural, friendly way.
- Do not copy the FAQ answer word for word unless necessary.
- Do not add facts that are not in the FAQ context.
- Do not guess names, prices, addresses, services, opening hours, policies, or contact details.
- If the user asks a question and the FAQ context does not contain the answer, reply exactly:
"${FALLBACK}"

Style:
- Sound warm, helpful, and professional.
- Keep replies short and conversational.
- Do not mention "FAQ context" to the user.
            `,
          },
          {
            role: "user",
            content: `
FAQ context:
${faqContext}

Customer message:
${prompt}
            `,
          },
        ],
      },
    });

    return {
      status: "success",
      response: response.choices[0].message.content,
    };
  } catch (err) {
    console.log("error", err);

    throw {
      status: "Failed",
      message: err.message,
    };
  }
};

const createChat = async (user,role,phoneNumber,content) =>{
  try{
    const newChat = await Chat.create({
      user,
      role,
      phoneNumber,
      content
    })
    return newChat
  }catch(err){
    throw err
  }
}

const getChatByCustomerphoneNumber = async (user,phoneNumber) =>{
  try{
    const foundChat = await Chat.find({user,phoneNumber}) ;
    return foundChat ;
  }catch(err){
    throw err
  }
}

const getChatByCustomerPhoneNumberIN24Hours = async (phoneNumber,user) => {

  try {

    // current time
    const now = new Date();

    // 24 hours ago
    const last24Hours = new Date(
      now.getTime() - (24 * 60 * 60 * 1000)
    );

    const foundChat = await Chat.find({
      user,
      phoneNumber,
      createdAt: {
        $gte: last24Hours
      }
    });

    return foundChat;

  } catch (err) {

    throw err;

  }

}

const checkCustomerFullChat = async (user, phoneNumber) =>{
  try{
    const foundChats = await Chat.find({user, phoneNumber}) ;
    return foundChats
  }catch(err){
    throw err
  }
}
const getChatNumbers = async (user) =>{
  try{
    const foundRecord = await Chat.find({user}) 
    let result = []
    foundRecord.forEach(chats =>{
      if(!result.includes(chats.phoneNumber)){
           result.push(chats.phoneNumber)
      }
    })
    return result 
  }catch(err){
    throw err
  }
}
module.exports = {
  getOpenRouterClient,
  createChat,
  getChatByCustomerphoneNumber,
  getChatByCustomerPhoneNumberIN24Hours,
  checkCustomerFullChat,
 generateResponse,
 getChatNumbers
};