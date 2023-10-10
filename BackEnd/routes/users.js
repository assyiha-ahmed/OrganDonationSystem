import express, { json, response } from 'express';
import cors from "cors"
import { v4 as uuidv4 } from 'uuid';
import fs, { accessSync, copyFileSync } from "fs"
import { doesNotReject, match } from 'assert';
import filterData from "../filter.js"
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import { parseArgs } from 'util';
import passport from 'passport';
import flash from 'express-flash';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import sendSingleMessage from "../MessageExmaple/Tele_starter/app.js";
import { USER_REFRESH_ACCOUNT_TYPE } from 'google-auth-library/build/src/auth/refreshclient.js';

const router = express.Router();
router.use(cors());
router.use(express.urlencoded({extended: false}))
router.use(session({
    secret: "process.env.SESSION_SECRET" ,
    resave:false,
    saveUninitialized:false
}))
router.use(cookieParser())


let users = [];
let registered = [

    {
        address: "addisAbeba",
        Name: "kidus_paulos"
    },

    {
        address: "bishoftu",
        Name: "Bishoftu_Hospital"
    },
    {
        address: "adama",
        Name: "Adama_General_Hospital"
    },
    {
        address: "modjo",
        Name: "Modjo_Primary"
    }

];
let newRegisteredDonors = [];
let patients = [];
let newDoners = [];
let approved = [];
let disapproved = [];
let nonMatchableDonor = [];
let nonMatchablepatient = [];
let preRegistrationOfDonor = [];
let reqHospitals = [];
let allowedHospitals =[];
let deniedHospitals =[];
let hospitals=[];

router.get('/set-cookie', (req,res)=>{

    res.cookie('newUser','false');
    res.cookie('isEmploye',false,{maxAge: 1000 * 60 ,httpOnly: true});
    res.send("cookies 🍪");

});

router.get('/read-cookie', (req,res)=>{
    let cookie = req.cookies;
    res.send(cookie)
});




router.post('/admin',(req,res) => {

   let name = req.body.userName;
   let password = req.body.password;

   console.log(name,password)

    res.cookie("name" , name);
    res.cookie("pasword" , password);

    console.log(req.cookies);
});

router.post('/hospitalLogin', async (req,res)=>{

    const username = req.body.userName;
    const password = req.body.password;

    let hospitalInfo  = fs.readFileSync("./files/allowedHospitals.txt", "utf8");
    hospitalInfo = JSON.parse(hospitalInfo);

    console.log(hospitalInfo,"hospital")

   let hospital = hospitalInfo.find((hospital) => hospital.userName == username);  

    console.log(hospital,"this-----------");
    console.log(password,username,"-----------");

    let CorrectPassword = await bcrypt.compare(password, hospital.password);
    console.log(CorrectPassword,"passsword")

    if (username == hospital.userName  && CorrectPassword) {

        res.cookie('name' , username);
        res.cookie("password" , CorrectPassword);

        res .redirect('./FrontEnd/hospital.html');
      }
       else {
        res.status(401).send('Invalid username or password');
      }

});

router.post('/reqAdmin', (req, res) => {
    let reqData =  req.body;

    reqHospitals.push({ ...reqData });

    const jsonData = JSON.stringify(reqHospitals);

    fs.writeFileSync('./files/requestedHospitals.txt', jsonData, (err) => {
        console.log("Saved");
    });
    res.send("Registered! Wait for our response.")
});



async function  newFunction () {
    const password = await bcrypt.hash(strPassword,10);
    return password;
}

router.get('/check',(req,res) => {
    var hospitals = fs.readFileSync('./files/allowedHospitals.txt', 'utf8');
    const jsonData = JSON.stringify(hospitals);
    res.send(jsonData);
})

router.post('/allowed', async (req, res) => {
    const hospital = req.body;

    let Name = "@" + hospital.Name;
       let hashedPassword = await newFunction();

        let data = {
            userName: Name,
            phone: req.body.ContactNumber,
            passwordReal: strPassword,
            password: hashedPassword
        }
        console.log(data, "<-------");

    allowedHospitals.push({ ...data });
    const jsonData = JSON.stringify(allowedHospitals);

    fs.writeFileSync('./files/allowedHospitals.txt', jsonData, (err) => {
        console.log("Saved")
    });

    let DH = JSON.parse(jsonData);
    console.log(DH)

    const hospitalNames = DH.map((hospital) => hospital.Name);
    console.log(hospitalNames);

    // console.log(deniedJsonData);

    let reqHospitals = fs.readFileSync('./files/requestedHospitals.txt', 'utf8');
    let reqHospitalsJsonData = JSON.parse(reqHospitals);

    let deniedName = reqHospitalsJsonData.map((user) => user.Name );
    console.log(deniedName)

    let deletHospitals = reqHospitalsJsonData.filter((user) => user.Name != hospitalNames);
    console.log("requested hospitals")
    console.log(deletHospitals);
    console.log("filterd")

    deletHospitals = JSON.stringify(deletHospitals);

    fs.writeFileSync('./files/requestedHospitals.txt', deletHospitals, (err) => {
        console.log("Saved")
    });


let message =`user name = ${data.userName} ` + '\n' +` password = ${strPassword}` + '\n' + "Login Link:localhost://5001/login" 

    sendSingleMessage(data.phone, message);

    
//   let  emailAddress = hospital.EmailAddress;
//   console.log(emailAddress,Password,Name)
// const transporter = nodemailer.createTransport({
//     service: "hotmail",
//     auth: {
//         user:"selambelete09123@gmail.com",
//         pass: "selam_belete_09123"
//     }
// });
// const option = {
//     from: "selambelete09123@gmail.com",
//     to:   "assiyaahmed75@gmail.com",
//     subject: "hi!",
//     text: "helloooo"
// };
// transporter.sendMail(option, function(err,info){
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log("sent :"+info.response);
// });

    res.send("Message Sent!")
});

router.post('/denied', (req, res) => {
    const hospital = req.body;
    deniedHospitals.push({ ...hospital });

    const jsonData = JSON.stringify(deniedHospitals);

    fs.writeFileSync('./files/denied.txt', jsonData, (err) => {
        console.log("Saved")
    });

    // let denied = fs.readFileSync('./files/requestedHospitals.txt', 'utf8');
    // let deniedJsonData = JSON.parse(denied);

    let DH = JSON.parse(jsonData);
    console.log(DH)

    const hospitalNames = DH.map((hospital) => hospital.Name);
    console.log(hospitalNames);

    // console.log(deniedJsonData);

    let reqHospitals = fs.readFileSync('./files/requestedHospitals.txt', 'utf8');
    let reqHospitalsJsonData = JSON.parse(reqHospitals);

    let deniedName = reqHospitalsJsonData.map((user) => user.Name );
    console.log(deniedName)

    let deletHospitals = reqHospitalsJsonData.filter((user) => user.Name != hospitalNames);
    console.log("requested hospitals")
    console.log(deletHospitals);
    console.log("filterd")

    deletHospitals = JSON.stringify(deletHospitals);

    fs.writeFileSync('./files/requestedHospitals.txt', deletHospitals, (err) => {
        console.log("Saved")
    });

});

router.get('/getRequest', (req, res) => {

    var readHospitalRequest =fs.readFileSync('./files/requestedHospitals.txt', 'utf8');
    const hospitalRequest = JSON.stringify(readHospitalRequest);
    res.send(hospitalRequest);

});

router.get('/donorsHistory', (req, res) => {
    var donors = fs.readFileSync('./files/donor.txt', 'utf-8');
    const donorsData = JSON.stringify(donors);
    res.send(donorsData);
});

router.post('/nonMatchableId', (req, res) => {
   
    let idOne = req.params.idOne;
    let idTwo = req.query.idTwo;

    console.log(idOne,idTwo);
    res.send(idOne,idTwo);
});

router.get('/patientsHistory', (req, res) => {

    var patients = fs.readFileSync('./files/patient.txt', 'utf-8');
    const patientsData = JSON.stringify(patients);

    res.send(patientsData);

});

router.get('/matched', (req, res) => {

    var matched = fs.readFileSync('./files/matched.txt', 'utf8');
    const jsonData = JSON.stringify(matched);
    res.send(jsonData);

});

router.get('/approved', (req, res) => {
    var approved = fs.readFileSync('./files/approved.txt', 'utf8');
    const jsonData = JSON.stringify(approved);
    res.send(jsonData);

});

router.get("/firstDonor", (req,res) => {
let firstDonor=fs.readFileSync('./files/firstDonor.txt','utf8');
const jsonData = JSON.stringify(firstDonor);
res.send(jsonData);
});

router.post("/firstDonor", (req,res) => {
    const donor = req.body;

    preRegistrationOfDonor.push({ ...donor, id: uuidv4() });

    const jsonData = JSON.stringify(preRegistrationOfDonor);

    fs.writeFileSync('./files/firstDonor.txt', jsonData, (err) => {
        console.log("Saved")
    });


    filterData();
    res.send(`Donor with the name ${donor.name} added to the data base!`);
    console.log(donor.name);
});

router.get('/disApproved', (req, res) => {
    var disapproved = fs.readFileSync('./files/disapproved.txt', 'utf8');
    const jsonData = JSON.stringify(disapproved);
    res.send(jsonData);

});

router.get('/abcd', (req, res) => {
    let loc = req.query.loc;

    res.send(loc);

});

router.post('/donor', (req, res) => {
    const donor = req.body;

    let donors = fs.readFileSync('./files/donor.txt', 'utf8');
    console.log(donors);
    donors = JSON.parse(donors);

    newDoners.push({ ...donor, id: uuidv4() });

    let newDonorsJson = JSON.stringify(newDoners);

    fs.writeFileSync('./files/donor.txt', newDonorsJson, (err) => {
        console.log("Saved");
    });

    filterData();
    res.send(`donor with the name ${donor.name} added to the data base!`);
});

router.post('/patient', (req, res) => {
    const patient = req.body;

    patients.push({ ...patient, id: uuidv4() });

    const jsonData = JSON.stringify(patients);

    fs.writeFileSync('./files/patient.txt', jsonData, (err) => {
        console.log("Saved")
    });

    filterData();
    res.send(`User with the name ${patient.name} added to the data base!`);
    console.log(patients.name);
});

router.post('/preRegistrationOfDonors', (req, res) => {
    const registeredDonor = req.body;

    newRegisteredDonors.push({ ...registeredDonor, id: uuidv4() });

    const jsonData = JSON.stringify(newRegisteredDonors);

    fs.writeFileSync('./files/preRegistration.txt', jsonData, (err) => {
        console.log("Saved");
    });

    let address = registeredDonor.address;
    console.log(address);

    for (let i = 0; i < registered.length; i++) {
        if (address == registered[i].address) {
            res.send(registered[i].Name);
        }

    }
});

// router.get('/deleteUser', (req, res) => {
//     res.send(idOne);
// });

router.get('/donorLocation', (req, res) => {

    let latitude = req.query.latitude;
    let longitude = req.query.longitude;

    let donorsLocation=[];

    let donorLocation = {
        lat: latitude,
        lng: longitude
    }

    donorsLocation.push(donorLocation);

    fs.writeFileSync('./files/donorLocation.txt', JSON.stringify(donorsLocation));
   
    res.send({latitude, longitude});

});

router.get('/getLocation',(req,res) =>{
    let location = fs.readFileSync('./files/donorLocation.txt','utf8');
    const jsonData = JSON.stringify(location);
    console.log(jsonData);
    res.send(jsonData);
});

router.get('/deleteAproved', (req, res) => {
    console.log("Here");
    let idOne = req.query.idOne;
    let idTwo = req.query.idTwo;

    let matched = fs.readFileSync('./files/matched.txt', 'utf8');
    let donor = fs.readFileSync('./files/donor.txt', 'utf8');
    let patient = fs.readFileSync('./files/patient.txt', 'utf8');

    let matchedJsonData = JSON.parse(matched);
    let donorJsonData = JSON.parse(donor);
    let patientJsonData = JSON.parse(patient);

    approved.push(matchedJsonData.find((user) => user.id == idOne));
    approved.push(matchedJsonData.find((user) => user.id == idTwo));

    fs.writeFileSync("./files/approved.txt", JSON.stringify(approved), (err) => {
        console.log("Saved");
    });

    let newDoner = donorJsonData.filter((user) => user.id != idOne);
    let newPatient = patientJsonData.filter((user) => user.id != idTwo);

    matchedJsonData = matchedJsonData.filter((user) => user.id != idOne);
    matchedJsonData = matchedJsonData.filter((user) => user.id != idTwo);



    fs.writeFileSync("./files/matched.txt", JSON.stringify(matchedJsonData), (err) => {
        console.log("Saved");
    });

    fs.writeFileSync("./files/donor.txt", JSON.stringify(newDoner), (err) => {
        console.log("Saved");
    });

    fs.writeFileSync("./files/patient.txt", JSON.stringify(newPatient), (err) => {
        console.log("Saved");
    });

});

router.get('/deleteDisAproved', (req, res) => {

    let idOne = req.query.idOne;
    let idTwo = req.query.idTwo;

    let matched = fs.readFileSync('./files/matched.txt', 'utf8');
    let matchedJsonData = JSON.parse(matched);

    disapproved.push(matchedJsonData.find((user) => user.id == idOne));
    disapproved.push(matchedJsonData.find((user) => user.id == idTwo));

    fs.writeFileSync("./files/disapproved.txt", JSON.stringify(disapproved), (err) => {
        console.log("Saved");
    });
    
    nonMatchableDonor.push(matchedJsonData.find((user) => user.id == idOne));
    nonMatchablepatient.push(matchedJsonData.find((user) => user.id == idTwo));

    fs.writeFileSync("./files/nonMatchableDonor.txt", JSON.stringify(nonMatchableDonor), (err) => {
        console.log("Saved");
    });

    fs.writeFileSync("./files/nonMatchablepatient.txt", JSON.stringify(nonMatchablepatient), (err) => {
        console.log("Saved");
    });

    newDoners.push(matchedJsonData.find((user) => user.id == idOne));
    patients.push(matchedJsonData.find((user) => user.id == idTwo));

    matchedJsonData = matchedJsonData.filter((user) => user.id != idOne);
    matchedJsonData = matchedJsonData.filter((user) => user.id != idTwo);

    fs.writeFileSync("./files/matched.txt", JSON.stringify(matchedJsonData), (err) => {
        console.log("Saved");
    });

    fs.writeFileSync("./files/donor.txt", JSON.stringify(newDoners), (err) => {
        console.log("Saved");
    });

    fs.writeFileSync("./files/patient.txt", JSON.stringify(patients), (err) => {
        console.log("Saved");
    });


    // nonMatchableId.push(matchedJsonData.find((user) => user.id == idOne));
    // nonMatchableId.push(matchedJsonData.find((user) => user.id == idTwo));
    // fs.writeFileSync("nonMacthable.txt", JSON.stringify(nonMatchableId), (err) => {
    //     console.log("Saved");
    // });
    // console.log("hello");

});
    

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id == id);
    res.send(foundUser);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params

    users = users.filter((user) => user.id != id);

    res.send(`User with id ${id} deleted from the database.`)
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;

    const { firstName, lastName, age } = req.body;

    const u = users.find((user) => user.id == id);

    if (firstName) u.firstName = firstName;
    if (lastName) u.lastName = lastName;
    if (age) u.age = age;

    res.send(`added`)


});



function fourDigitNumber() {

    let n = Math.random() * 9000 + 1000;
  
    let nString = n.toString();
  
    while (nString.length < 4) {
      nString = "0" + nString;
    }

    return nString;
  }
  let n = fourDigitNumber();
  n = parseInt(n);
 let Password = Math.floor(n) + 1;
 const strPassword = Password.toString(); 




export default router;