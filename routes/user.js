const express = require("express") ;
const passport = require("passport"); 
const userController = require("../controller/user") ;
const auth = require("../middleware/auth") ;


const router = express.Router() ;
// get routes
router.get("/login", userController.get_login )

router.get("/signup", userController.get_signup) ;

router.get("/verify-code", userController.get_verifyCode) ;

router.get("/dashboard", auth.isUserLoggedIn , userController.get_dashboard) ;

router.get("/faq-management",auth.isUserLoggedIn ,userController.get_FAQManagement )

router.get("/lead-management", auth.isUserLoggedIn, userController.get_leadManagemant)

router.get("/lead",auth.isUserLoggedIn ,userController.getAllLeads ) ;

router.get("/single-lead",auth.isUserLoggedIn ,userController.getSingleLead  ) ; 

router.get("/settings", auth.isUserLoggedIn , userController.get_settings)

router.get("/logout",auth.isUserLoggedIn , userController.logout )


// post/put routes

router.post("/login",auth.loginIsVerified,passport.authenticate("user.login", { failureRedirect: "/user/login",failureFlash: true,successRedirect: "/user/dashboard",})) ;

router.post("/signup", userController.post_signUp) ;

router.post("/verify-code", userController.post_verifyCode)

router.put("/update-lead/:id/:status", auth.isUserLoggedIn, userController.updateLead) ;

router.post("/update-profile",auth.loginIsVerified ,userController.post_updateprofile) 

router.post("/change-password",auth.loginIsVerified ,userController.post_changepassword)


module.exports = router;

