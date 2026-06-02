const axios = require("axios");

const mailTransporter = async (
    to,
    message,
    subject
) => {

    try{

        const data = JSON.stringify({

            to: to,

            name: "LCRP",

            subject: subject,

            message: message,

        });

        const config = {

            method: "post",

            maxBodyLength: Infinity,

            url: "https://eedu.tech/api/v1/mail/send",

            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },

            data: data,

        };

        const sentMail = await axios.request(config);

        return sentMail.data;

    }catch(err){

        console.log(err.message);

        throw err;
    }

};

module.exports = mailTransporter;