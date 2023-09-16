import express, { json } from 'express';
import cors from "cors"
import { v4 as uuidv4 } from 'uuid';
import fs, { copyFileSync } from "fs"
import { doesNotReject, match } from 'assert';
import filterData from "../filter.js"
import nodemailer from 'nodemailer';

const router = express.Router();
router.use(cors());

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


router.post('/reqAdmin', (req, res) => {
    let reqData =  req.body;

    reqHospitals.push({ ...reqData });

    const jsonData = JSON.stringify(reqHospitals);

    fs.writeFileSync('requestedHospitals.txt', jsonData, (err) => {
        console.log("Saved");
    });


});

router.post('/allowed', (req, res) => {
    const hospital = req.body;



    function fourDigitNumber() {

        let n = Math.random() * 9000 + 1000;
      
        let nString = n.toString();
      
        while (nString.length < 4) {
          nString = "0" + nString;
        }
    
        return nString;
      }
    
     let n = fourDigitNumber();
     n=parseInt(n);
     console.log(typeof(n));
    let Password = Math.floor(n) + 1; 

    let Name = "@" + hospital.Name;

    allowedHospitals.push({ ...hospital, userName : Name, password:Password });

    const jsonData = JSON.stringify(allowedHospitals);

    fs.writeFileSync('allowedHospitals.txt', jsonData, (err) => {
        console.log("Saved")
    });
    
  let  emailAddress = hospital.EmailAddress;


  console.log(emailAddress,Password,Name)

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user:"selambelete09123@gmail.com",
        pass: "selam_belete_09123"
    }
});


const option = {
    from: "selambelete09123@gmail.com",
    to:   "assiyaahmed75@gmail.com",
    subject: "hi!",
    text: "helloooo"
};

transporter.sendMail(option, function(err,info){
    if(err){
        console.log(err);
        return;
    }
    console.log("sent :"+info.response);
})




//     let allowedHospital = fs.readFileSync("allowed.txt","utf8");
// allowedHospital = JSON.parse(allowedHospital)
// console.log(typeof(allowedHospital))

// for(let i=0;i<allowedHospital.length;i++){
//   let  emailAddress = allowedHospital[i].EmailAddress;
//    let password = allowedHospital[i].password;
//   let  userName = allowedHospital[i].userName;

//   console.log(emailAddress)



 



});

router.post('/denied', (req, res) => {
    const hospital = req.body;

    deniedHospitals.push({ ...hospital });

    const jsonData = JSON.stringify(deniedHospitals);

    fs.writeFileSync('denied.txt', jsonData, (err) => {
        console.log("Saved")
    });
});

router.get('/getRequest', (req, res) => {

    var readHospitalRequest =fs.readFileSync('./requestedHospitals.txt', 'utf8');
    const hospitalRequest = JSON.stringify(readHospitalRequest);
    res.send(hospitalRequest);

});

router.get('/donorsHistory', (req, res) => {
    var donors = fs.readFileSync('./donor.txt', 'utf-8');
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
    var patients = fs.readFileSync('./patient.txt', 'utf-8');
    const patientsData = JSON.stringify(patients);
    res.send(patientsData);
});

router.get('/matched', (req, res) => {
    var matched = fs.readFileSync('./matched.txt', 'utf8');
    const jsonData = JSON.stringify(matched);
    res.send(jsonData);

});

router.get('/approved', (req, res) => {
    var approved = fs.readFileSync('./approved.txt', 'utf8');
    const jsonData = JSON.stringify(approved);
    res.send(jsonData);

});

router.get("/firstDonor", (req,res) => {
let firstDonor=fs.readFileSync('firstDonor.txt','utf8');
const jsonData = JSON.stringify(firstDonor);
res.send(jsonData);
});

router.post("/firstDonor", (req,res) => {
    const donor = req.body;

    preRegistrationOfDonor.push({ ...donor, id: uuidv4() });

    const jsonData = JSON.stringify(preRegistrationOfDonor);

    fs.writeFileSync('firstDonor.txt', jsonData, (err) => {
        console.log("Saved")
    });


    filterData();
    res.send(`Donor with the name ${donor.name} added to the data base!`);
    console.log(donor.name);
});

router.get('/disApproved', (req, res) => {
    var disapproved = fs.readFileSync('./disapproved.txt', 'utf8');
    const jsonData = JSON.stringify(disapproved);
    res.send(jsonData);

});

router.get('/abcd', (req, res) => {
    let loc = req.query.loc;


    res.send(loc);

});

router.post('/donor', (req, res) => {
    const donor = req.body;

    let donors = fs.readFileSync('donor.txt', 'utf8');
    console.log(donors);
    donors = JSON.parse(donors);
    // console.log(donors);

    newDoners.push({ ...donor, id: uuidv4() });

    let newDonorsJson = JSON.stringify(newDoners);

    fs.writeFileSync('donor.txt', newDonorsJson, (err) => {
        console.log("Saved");
    });

    filterData();
    res.send(`donor with the name ${donor.name} added to the data base!`);
});


router.post('/patient', (req, res) => {
    const patient = req.body;



    patients.push({ ...patient, id: uuidv4() });

    const jsonData = JSON.stringify(patients);

    fs.writeFileSync('patient.txt', jsonData, (err) => {
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

    fs.writeFileSync('preRegistration.txt', jsonData, (err) => {
        console.log("Saved");
    });

    let address = registeredDonor.address;
    console.log(address);
    // console.log(donor.date);
    // res.send("Hello World")
    for (let i = 0; i < registered.length; i++) {
        if (address == registered[i].address) {
            res.send(registered[i].Name);
        }

    }
    //  res.send(`donor with the name ${address} added to the data base!`);
});


router.get('/deleteUser', (req, res) => {




    res.send(idOne);


});

router.get('/donorLocation', (req, res) => {

    let latitude = req.query.latitude;
    let longitude = req.query.longitude;

    let donorsLocation=[];

    let donorLocation = {
        lat: latitude,
        lng: longitude
    }

    donorsLocation.push(donorLocation);
    // console.log(donorsLocation, "<-------")

    fs.writeFileSync('donorLocation.txt', JSON.stringify(donorsLocation));
   
    res.send({latitude, longitude});

});

router.get('/getLocation',(req,res) =>{
    let location = fs.readFileSync('./donorLocation.txt','utf8');
    const jsonData = JSON.stringify(location);
    console.log(jsonData);
    res.send(jsonData);
});

router.get('/deleteAproved', (req, res) => {
    console.log("Here");
    let idOne = req.query.idOne;
    let idTwo = req.query.idTwo;

    let matched = fs.readFileSync('./matched.txt', 'utf8');
    let matchedJsonData = JSON.parse(matched);

    approved.push(matchedJsonData.find((user) => user.id == idOne));
    approved.push(matchedJsonData.find((user) => user.id == idTwo));


    // console.log(approved);

    fs.writeFileSync("approved.txt", JSON.stringify(approved), (err) => {
        console.log("Saved");
    });


    matchedJsonData = matchedJsonData.filter((user) => user.id != idOne);
    matchedJsonData = matchedJsonData.filter((user) => user.id != idTwo);



    fs.writeFileSync("matched.txt", JSON.stringify(matchedJsonData), (err) => {
        console.log("Saved");
    });
    
    // console.log(approved);
    // res.send(approved);

});

router.get('/deleteDisAproved', (req, res) => {

    let idOne = req.query.idOne;
    let idTwo = req.query.idTwo;

    let matched = fs.readFileSync('./matched.txt', 'utf8');
    let matchedJsonData = JSON.parse(matched);

    disapproved.push(matchedJsonData.find((user) => user.id == idOne));
    disapproved.push(matchedJsonData.find((user) => user.id == idTwo));

    fs.writeFileSync("disapproved.txt", JSON.stringify(disapproved), (err) => {
        console.log("Saved");
    });
    
    nonMatchableDonor.push(matchedJsonData.find((user) => user.id == idOne));
    nonMatchablepatient.push(matchedJsonData.find((user) => user.id == idTwo));

    fs.writeFileSync("nonMatchableDonor.txt", JSON.stringify(nonMatchableDonor), (err) => {
        console.log("Saved");
    });

    fs.writeFileSync("nonMatchablepatient.txt", JSON.stringify(nonMatchablepatient), (err) => {
        console.log("Saved");
    });

    newDoners.push(matchedJsonData.find((user) => user.id == idOne));
    patients.push(matchedJsonData.find((user) => user.id == idTwo));

    matchedJsonData = matchedJsonData.filter((user) => user.id != idOne);
    matchedJsonData = matchedJsonData.filter((user) => user.id != idTwo);

    fs.writeFileSync("matched.txt", JSON.stringify(matchedJsonData), (err) => {
        console.log("Saved");
    });

    fs.writeFileSync("donor.txt", JSON.stringify(newDoners), (err) => {
        console.log("Saved");
    });

    fs.writeFileSync("patient.txt", JSON.stringify(patients), (err) => {
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
})

router.patch('/:id', (req, res) => {
    const { id } = req.params;

    const { firstName, lastName, age } = req.body;

    const u = users.find((user) => user.id == id);

    if (firstName) u.firstName = firstName;
    if (lastName) u.lastName = lastName;
    if (age) u.age = age;

    res.send(`added`)


})

export default router;