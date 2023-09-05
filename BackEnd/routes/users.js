import express from 'express';
import cors from "cors"
import { v4 as uuidv4 } from 'uuid';
import fs from "fs"
import { doesNotReject, match } from 'assert';
import filterData from "../filter.js"

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


router.get('/donorsHistory', (req, res) => {
    var donors = fs.readFileSync('./donor.txt', 'utf-8');
    const donorsData = JSON.stringify(donors);
    res.send(donorsData);
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