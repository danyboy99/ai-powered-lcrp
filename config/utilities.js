const generateLicensedKey = () =>{
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWSYZ0123456789" ;
    let result = "" ;

    for (let i = 0; i < 10 ; i++){
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return "OM-"+result
}

const generateCode = (number) =>{
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWSYZ0123456789" ;
    let result = "" ;

    for (let i = 0; i < number ; i++){
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
} ;
const getNextMinutes = (period, minutes) => {
   if(period === "Previous"){
     const now = new Date();

    // Add 10 minutes
    now.setMinutes(now.getMinutes() - minutes);

    return now;
   }

    const now = new Date();

    // Add 10 minutes
    now.setMinutes(now.getMinutes() + minutes);

    return now;
}
module.exports ={
    generateLicensedKey ,
    generateCode,
    getNextMinutes
}