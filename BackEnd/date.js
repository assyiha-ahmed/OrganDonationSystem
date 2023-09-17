import fs from "fs";
import { send } from "process";
import sendSingleMessage from "./MessageExmaple/Telerivet-Starter/app.js";

let donorsData = fs.readFileSync('firstDonor.txt',"utf8");
donorsData = JSON.parse(donorsData);

for(let i=0; i < donorsData.length; i++){

   let date = donorsData[i].date;
   let today = new Date();
   let name = donorsData[i].name;
   let phone = donorsData[i].contactNumber;

   console.log(phone);

    dateData(date,today,name,phone);

}

function dateData(date,today,name,phone){

    let day = new Date(date).getDate();
    let month = (new Date(date).getMonth()+1) *30;
    let year =(new Date(date).getFullYear())*365;
    let totalDate =day+month+year;
   
    let todaysDay = today.getDate();
    let todaysMonth = (today.getMonth()+1)*30;
    let todaysYear = (today.getFullYear())*365;   
    let totalToday=todaysDay+todaysMonth+todaysYear;

    let dayDifference = totalToday- totalDate;
    // console.log( name,dayDifference);

    

    if (dayDifference>=3){
        let message =`Dear ${name},\n\nI hope this email finds you well.\n\nI'm writing to you today with a heavy heart. It has been ${dayDifference} days since you registered to donate an organ, and we are still waiting for you to come to the hospital.\n\nWe know that you are a busy person, but we urge you to please make time to donate your organ. There are many patients who are waiting for a life-saving transplant, and some of them are in very critical condition.\n\nWe recently met a young woman named Sarah who is waiting for a kidney transplant. She is only 25 years old, but she has been on dialysis for the past 5 years. She is tired of being hooked up to a machine every day, and she just wants to live a normal life.\n\nWe also met a little boy named Michael who is waiting for a heart transplant. He is only 5 years old, and he has been in and out of the hospital his whole life. He is so tired of being sick, and he just wants to be able to play with his friends.\n\nThese are just two of the many patients who are waiting for a life-saving organ transplant. Your donation could save their life.\n\nWe know that this is a big decision, but we believe in you. You are a kind and compassionate person, and we know that you want to help others.\n\nPlease, make the time to come to the hospital and donate your organ. You could save a life.\n\nThank you for your consideration.\n\nSincerely,\n\n[Your name]`;
        console.log(message)


    sendSingleMessage(phone, message);
    }

}


// function sendSingleMessage(phone, message){

//     // CHl9p_avxkvoYGO9rtfmho4VLt4MXfBLZIra
//     var tr = new telerivet.API(API_KEY);
//     var project = tr.initProjectById(PROJECT_ID);
    
//     project.sendMessage({
//         content: message, 
//         to_number: phone
//     }, function(err, message) {
//         if (err) {
//           console.log("error")
//         } else {
//           console.log("message sent!", message)
//         }
//     });
//     }

// export default sendSingleMessage;