const User = require("../model/users") ; 
const VerificationCode = require("../model/verificationCode") ;
const utilities = require("../config/utilities") ;
const createUser = async (fullName,email,password,phoneNumber,brandName) =>{
    try{
        const newUser = await User.create({
            fullName,
            email,
            password,
            phoneNumber,
            brandName
        }) ;
        return newUser 
    }catch(err){
        throw err
    }
} ;

const getUserById = async (id) =>{
    try{
        const foundUser = await User.findById(id) ;
        return foundUser
    }catch(err){
        throw err 
    }
}

const getUserByEmail = async (email) =>{
    try{
        const foundUser = await User.findOne({email}) ;
        return foundUser
    }catch(err){
        throw err
    }
}
const createVerificationCode = async (user,code) =>{
    try{
       let expiredAt = utilities.getNextMinutes("", 10)
       const newVerificationCode  = VerificationCode.create({
        user,
        code,
        expiredTime: expiredAt
       }) ;
       return newVerificationCode
    }catch(err){
        throw err 
    }
}

const verifyCode = async (user_id, code) =>{
    try{
        const foundCode = await VerificationCode.find({
    user: user_id,
    expiredTime: { $gt: new Date() } 
        }); 
        let result = false 
        for (let i = 0; i < foundCode.length; i++) {
            if(code === foundCode[i].code){
                result = true
            }
        }
        return result
    }catch(err){
        throw err 
    }
}
const editProfile  = async (id,fullName,brandName ) =>{
    try{
        const updatedUser = await User.findByIdAndUpdate(id,{fullName,brandName}) ;
        return updatedUser
    }catch(err){
        throw err
    }
}
const changePassword = async (id , password) =>{
    try{
        const updatedUser = await User.findByIdAndUpdate(id,{password}) ;
        return updatedUser
    }catch(err){
        throw err
    }
}
module.exports= {
    createUser, 
    getUserById,
    getUserByEmail,
    createVerificationCode,
    verifyCode ,
    editProfile ,
    changePassword
}