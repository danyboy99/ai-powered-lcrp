const FAQServices = require("../services/faq") ;


const newFAQ = async (req,res) =>{
     let errMsg = [];
    let successMsg = [];
    try{
        const {question,answer} = req.body ; 
        const user = req.user ;
        const createdFAQ = await FAQServices.createFAQ(user._id,question, answer) ;
        successMsg.push("FAQ created successfuly") ;
        req.flash("success", successMsg);
        return res.redirect("/user/faq-management") ;
    }catch(err){
        errMsg.push(err.message);
        req.flash("error", errMsg);
        return res.redirect("/user/faq-management")   
    }
}

const editFAQ = async (req,res) =>{
      let errMsg = [];
    let successMsg = [];
    try{
      const {recordid,question,answer} = req.body ;   
      console.log("req.body", req.body)
      const editFAQ = await FAQServices.editFAQ(recordid,question,answer) ;
       successMsg.push("FAQ updated successfuly") ;
        req.flash("success", successMsg);
        return res.redirect("/user/faqscreen") ; 
    }catch(err){
        errMsg.push(err.message);
        req.flash("error", errMsg);
        return res.redirect("/user/faqscreen")   
    }
}

const deleteFAQ = async (req,res) =>{
      let errMsg = [];
    let successMsg = [];
    try{
        const id = req.params.id ;
        await FAQServices.deleteFAQ(id) ;
         successMsg.push("FAQ deleted successfuly") ;
        req.flash("success", successMsg);
        return res.redirect("/user/faqscreen") ; 
    }catch(err){
        errMsg.push(err.message);
        req.flash("error", errMsg);
        return res.redirect("/user/faqscreen")   
    }
}
const getAllFAQ = async (req,res) =>{
    try{
        const user = req.user 
        const foundFAQ = await FAQServices.getFAQByUserId(user._id) ;
        return res.json({
            status:"success",
            data: foundFAQ
        })
    }catch(err){
        errMsg.push(err.message);
        req.flash("error", errMsg);
        return res.redirect("/user/faqscreen")    
    }
}
module.exports ={
    newFAQ,
    editFAQ,
    deleteFAQ,
    getAllFAQ
} 

