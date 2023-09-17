import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user:"fenettnugusu@gmail.com",
        pass: "12345organ54321"
    }
});



const options = {
    from: "fenettnugusu@gmail.com",
    to: "assiyaahmed75@gmail.com",
    subject: "you are great!",
    text: "wow!"
};

transporter.sendMail(options, function(err,info){
    if(err){
        console.log(err);
        return;
    }
    console.log("sent:"+info.response);
})