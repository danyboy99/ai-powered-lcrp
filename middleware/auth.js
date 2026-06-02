const userService = require("../services/user") ;
const transporter = require("../config/nodeMailer");
const utilities = require("../config/utilities"); 

const isUserLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please sign in to access this page");
  res.redirect("/user/login");
};


const loginIsVerified = async (req,res,next) =>{
     let errMsg = [];
  let successMsg = [];
  try{
    const {email} = req.body ; 
    let foundUser = await userService.getUserByEmail(email) ;
    if(foundUser){
      if(foundUser.isVerified === false){

             // send verification code 
              let code = utilities.generateCode(7)  
              await userService.createVerificationCode(foundUser._id,code) ;
              console.log("got here email sent init")
               // Email HTML message
              const message = `
      
                  <div style="
                      background:#07111f;
                      padding:40px;
                      color:white;
                      font-family:Arial;
                  ">
      
                      <h1 style="color:#38bdf8;">
                          Welcome To LCRP
                      </h1>
      
                      <p>
                          Hello ${foundUser.fullName},
                      </p>
      
                      <p>
                          Thank you for signing up.
                          Use the verification code below
                          to verify your account.
                      </p>
      
                      <h2 style="
                          background:#111c2e;
                          padding:20px;
                          border-radius:10px;
                          text-align:center;
                          letter-spacing:5px;
                          color:#38bdf8;
                      ">
                          ${code}
                      </h2>
      
                      <p>
                          This code expires in 10 minutes.
                      </p>
      
                  </div>
      
              `;
                await transporter(
      
                  foundUser.email,
      
                  message,
      
                  "Verify Your LCRP Account"
      
              );
              console.log("email sent successfuly")

      errMsg.push(`User account not verified,check your mail (${email}) for verification code`) ;
      req.flash("error",  errMsg) ;
      req.session.email = foundUser.email  ;
     return  res.redirect("/user/verify-code") ;
    }
    } ;
    return next() ;
  }catch(err){
    errMsg.push(err.message) ;
     req.flash("error", errMsg);
   return res.redirect("/")
  }
}

module.exports = {
    isUserLoggedIn,
    loginIsVerified
}