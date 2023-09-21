const express = require("express");
const bcrypt = require('bcrypt');

const fs = require("fs");

const cors = require("cors");

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.use(cors())

app.get("/", function (request, response) {
    console.log("Here")
    response.sendFile(__dirname + "/preRegistration.html");
});

app.get("/registered", function (request, response) {
    response.sendFile(__dirname + "/registered.html");
});


async function comparePassword(password, hospitalPassword) {
    const compare = await bcrypt.compare(password, hospitalPassword);
    console.log(compare, "<------------")
    return compare;
}
app.get('/login', (req, res) => {
    console.log("Here")
    res.sendFile(__dirname + "/hospitalForm.html");
})

app.get('/logedin', (req, res)=>{
    res.sendFile(__dirname + "/hospital.html");
})

app.post("/hospitals", async (req, res) => {


    const username = req.body.userName;
    const password = req.body.password;

    console.log(username, password);

    let hospitalInfo = fs.readFileSync("../BackEnd/files/allowedHospitals.txt", "utf8");
    hospitalInfo = JSON.parse(hospitalInfo);


    let hospital = hospitalInfo.find((hospital) => hospital.userName == username);

    //     console.log(hospital,"this-----------");
    //     console.log(password,username,"-----------");
    if (hospital) {
        let CorrectPassword = await bcrypt.compare(password, hospital.password);
        console.log(CorrectPassword, "passsword");

        if (CorrectPassword) {

            res.cookie('name', username);
            res.cookie("password", CorrectPassword);

            res.json({location: "http://localhost:5000/logedin"});
        }
        else {
            res.status(401).send('Invalid username or password');
        }
    }
    else {
        console.log("User not found!")
    }




});



app.post("/", function (req, res) {

});

app.listen(5000, function () {

    console.log("server running on port 6000");

});