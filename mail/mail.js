const nodemailer= require('nodemailer');
const transporter=nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:'dunguyen20091998@gmail.com',
        pass:'22091998'
    }
})
module.exports={
    transporter,
    
}