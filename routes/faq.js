const express = require("express") ;
const faqController = require("../controller/faq") ;
const auth = require("../middleware/auth") ;
const router = express.Router() ;


router.post("/",auth.isUserLoggedIn ,faqController.newFAQ) ;

router.get("/", auth.isUserLoggedIn, faqController.getAllFAQ) ;

router.put("/", auth.isUserLoggedIn, faqController.editFAQ)  ;

router.delete("/:id", auth.isUserLoggedIn, faqController.deleteFAQ) ;









module.exports = router