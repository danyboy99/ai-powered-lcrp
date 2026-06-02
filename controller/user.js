const userService = require("../services/user") ;
const utilities = require("../config/utilities") ;
const argon = require("argon2") ; 
const transporter = require("../config/nodeMailer") ;
const leadServices = require("../services/lead") ;


const post_signUp = async (req,res) =>{
    let errMsg =[] ;
    let successMsg = []; 
    try{
        const {fullName,email,password,brandName,phoneNumber} = req.body ;
         const foundUser = await userService.getUserByEmail(email) ;

        if(foundUser){
             errMsg.push("user already exist Login instead");
        req.flash("error", errMsg);
        return res.redirect("/user/login")
        }

        const hashPassword = await argon.hash(password)
        const newUser = await userService.createUser(fullName,email,hashPassword,phoneNumber,brandName) ;
        
         let code = utilities.generateCode(7)  
        await userService.createVerificationCode(newUser._id,code) ;
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
                    Hello ${newUser.fullName},
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

            newUser.email,

            message,

            "Verify Your LCRP Account"

        );
         console.log("email sent !")
        successMsg.push(`verification code has been sent to this mail ${newUser.email}`) ;
        req.flash("success", successMsg);
        req.session.email = newUser.email  
        console.log("register-req.session", req.session.email )
        return res.redirect("/user/verify-code")
    }catch(err){
        errMsg.push(err.message);
        req.flash("error", errMsg);
        return res.redirect("/user/signup") ;
    }
}

const regenerateVerificationCode = async (req,res) =>{
     let errMsg = [];
  let successMsg = [];
    try{
       
          let  user = await userService.getUserByEmail(req.session.email) ;
          // send verification code 
        let code = utilities.generateCode(7)  
        await userService.createVerificationCode(newUser._id,code) ;
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
                    Hello ${user.fullName},
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

            newUser.email,

            message,

           "Verify Your LCRP Account"

        );
            console.log("mail sent")
          successMsg.push("Verification code sent !") ;
        req.flash("success", successMsg);
        return res.redirect("/user/verify-code")
    }catch(err){
         errMsg.push(err.message);
        req.flash("error", errMsg);
        return res.redirect("/user/verify-code") 
    }
}
const post_verifyCode = async (req,res) =>{
     let errMsg = [];
  let successMsg = [];
    try{
        const {code} = req.body ; 
        let user = await userService.getUserByEmail(req.session.email) ;
        const verification = await userService.verifyCode(user._id,code) ;
        if(!verification){
             errMsg.push("incorrect code or expired code");
        req.flash("error", errMsg);
        return res.redirect("/user/verify-code") 
        }
        user.isVerified = true ;
        await user.save() ;
        successMsg.push("Account verified successfuly !") ; 
        req.flash("success", successMsg);
        return res.redirect("/user/login")
    }catch(err){
          errMsg.push(err.message);
        req.flash("error", errMsg);
        return res.redirect("/user/verify-code") 
    }
}





// get controller 
const get_signup = async (req,res) =>{
     const successMsg = req.flash("success");
    const errMsg = req.flash("error"); 

    res.render("screens/signup" ,{
         hasErr: errMsg.length > 0,
        hasSuccess: successMsg.length > 0,
        errMsg: errMsg,
        successMsg: successMsg,
    })
}
const get_login = (req,res) =>{
     const successMsg = req.flash("success");
    const errMsg = req.flash("error"); 
   
     res.render("screens/login" ,{
         hasErr: errMsg.length > 0,
        hasSuccess: successMsg.length > 0,
        errMsg: errMsg,
        successMsg: successMsg,
    })
}
const get_dashboard =async  (req,res) =>{
     const successMsg = req.flash("success");
    const errMsg = req.flash("error"); 
    const user = req.user

    res.render("screens/dashboard", {
        user,
        hasErr: errMsg.length > 0,
        hasSuccess: successMsg.length > 0,
        errMsg: errMsg,
        successMsg: successMsg,
    })
}
const get_verifyCode = (req,res) =>{
     const successMsg = req.flash("success");
    const errMsg = req.flash("error"); 
        console.log("register-req.session", req.session.email )
   
     res.render("screens/verifycode" ,{
         hasErr: errMsg.length > 0,
        hasSuccess: successMsg.length > 0,
        errMsg: errMsg,
        successMsg: successMsg,
    })
}

const get_FAQManagement = async (req,res) =>{
    const successMsg = req.flash("success");
     const errMsg = req.flash("error"); 
     const user = req.user 
     res.render("screens/faqscreen" ,{
         hasErr: errMsg.length > 0,
        hasSuccess: successMsg.length > 0,
        errMsg: errMsg,
        successMsg: successMsg,
        user
    })
}

const getAllLeads = async (req,res) =>{
    try{
        const user = req.user ;
        const foundLeads = await leadServices.getLead(user._id) ;
        return res.json({
            status:"success",
            data: foundLeads
        })
    }catch(err){
        return res.json({
            status: "failed",
            err
        })
}
}

const getSingleLead = async (req,res) =>{
    try{
        const {id} = req.params ;
        const foundLead = await leadServices.viewSingleLead(id) ;
        return res.json({
            status: "success", 
            data: foundLead
        })
    }catch(err){
        return res.json({
            status:"failed",
            err
        })
    }
}




module.exports = {
post_signUp,
regenerateVerificationCode,
post_verifyCode,
get_signup,
get_login,
get_dashboard,
get_verifyCode ,
getAllLeads,
getSingleLead,
get_FAQManagement
}