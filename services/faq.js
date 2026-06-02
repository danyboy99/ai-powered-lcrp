const FAQ = require("../model/FAQ") ;

const createFAQ = async (user,question,answer) =>{
    try{
        const newFAQ = await FAQ.create({
            user,
            question,
            answer
        }) ;
        return newFAQ 
    }catch(err){
        throw err
    }
} ; 
const getFAQByUserId = async(user) =>{
    try{
        const foundFAQ = await FAQ.find({user}) ;
        return foundFAQ
    }catch(err){
        throw err
    }
} ; 
const editFAQ = async (id, question, answer) =>{
    try{
        const foundFAQ = await FAQ.findByIdAndUpdate(id,{question,answer});

        return foundFAQ 
    }catch(err){
        throw err
    }
} ; 
const deleteFAQ = async (id) =>{
    try{
     await  FAQ.findByIdAndDelete(id) ; 
     return "done"
    }catch(err){
        throw err
    }
} ; 
module.exports ={
    createFAQ ,
    getFAQByUserId ,
    editFAQ,
    deleteFAQ
}