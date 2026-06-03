const Lead = require("../model/leads") ;


const createLead = async (user,source,status,phoneNumber) =>{
    try{
        const newLead = await Lead.create({
            user,
            source,
            status,
            phoneNumber
        }) ;
        return newLead 
    }catch(err){
        throw err 
    }
}
const changeLeadStatus = async (id,status) =>{
    try{
        const editedLead = await Lead.findByIdAndUpdate(id,{status}) ;
        return editedLead
    }catch(err){
        throw err
    }
}
const getLead = async (user) =>{
    try{
        const checkthis = user.toString()
        const foundLead = await Lead.find({user: checkthis})  
        return foundLead
    }catch(err){
        throw err
    }
} ;
const viewSingleLead = async (id) =>{
    try{
        const foundLead = await Lead.findById(id) ;
        return foundLead
    }catch(err){
        throw err 
    }
}

module.exports = {
    createLead,
    getLead,
    viewSingleLead, 
    changeLeadStatus
}