const Appointment = require("../model/appointment") ;


const createAppointment = async (user,phoneNumber, email, address, issue, date) =>{
    try{
        const newAppointment = await Appointment.create({
            user,
            phoneNumber,
            email,
            address,
            issue,
            appointmentDate : date
        }) 
        return newAppointment
    }catch(err){
        throw err 
    }
}

const getAllAppointment = async (user) =>{
    try{
        const foundAppointment = await Appointment.find({user}) ;
        return foundAppointment
    }catch(err){
        throw err
    }
}

const getSingleAppointment = async (id) =>{
    try{
        const foundAppointment = await Appointment.findById(id) ;
        return foundAppointment
    }catch(err){
        throw err
    }
}

const updateAppointment = async (id, status, date) =>{
    try{
        const updatedAppointment = await Appointment.findByIdAndUpdate(id,{status,appointmentDate: date}) ;
        return updatedAppointment
    }catch(err){
        throw err
    }
}


module.exports = {
    createAppointment,
    getAllAppointment,
    getSingleAppointment,
    updateAppointment
}
