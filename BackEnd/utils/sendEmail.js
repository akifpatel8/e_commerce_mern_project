const nodemailer = require("nodemailer")

const sendEmail =async({email,subject,message})=>{
    const transpoter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD
        }
    })
    const mailOption = {
        from:process.env.SMPT_MAIL,
        to:email,
        subject,
        message,
    }
    await transpoter.sendMail(mailOption)
}
module.exports = sendEmail