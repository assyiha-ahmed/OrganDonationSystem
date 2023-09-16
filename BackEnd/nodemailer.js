import nodemailer from 'nodemailer';
import fs from 'fs';

let hospital = fs.readFileSync("allowedHospitals.txt","utf8");
hospital = JSON.parse(hospital)
console.log(typeof(hospital))

for(let i=0;i<hospital.length;i++){
  let  emailAddress = hospital[i].EmailAddress;
   let password = hospital[i].password;
  let  userName = hospital[i].userName;

  console.log(emailAddress)

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user:"fenettnugusu@gmail.com",
        pass: "fenet2127"
    }
});


const option = {
    from: "fenettnugusu@gmail.com",
    to: emailAddress,
    subject: "you are great",
    text: `password:${password} userName: ${userName}`
};

transporter.sendMail(option, function(err,info){
    if(err){
        console.log(err);
        return;
    }
    console.log("sent:"+info.response);
})

}
 