const express = require("express");


const app = express();

app.use(express.static("public"));

app.get("/BackEnd", function (request, response) {
    response.sendFile(__dirname + "./routes/users.js");
});

app.get("/hospitals", (res, req) => {
    response.sendFile(+"./");
})

async function comparePassword(password, hospitalPassword) {
    const compare = await bcrypt.compare(password, hospitalPassword);
    return compare;
}
app.get('/helloworld', (req, res) => {
    res.sendFile(__dirname + "../FrontEnd/hospitalForm.html");
})

app.get("/hospital", function (request, response) {


    const username = req.body.userName;
    const password = req.body.password;

    let hospitalInfo = fs.readFileSync("./files/allowedHospitals.txt", "utf8");
    hospitalInfo = JSON.parse(hospitalInfo);

    console.log(hospitalInfo, "hospital")

    let hospital = hospitalInfo.find((hospital) => hospital.userName == username);

    console.log(hospital, "this-----------");
    console.log(password, username, "-----------");

    let CorrectPassword = comparePassword(password, hospital.password);
    console.log(CorrectPassword, "passsword")

    if (username == hospital.userName && CorrectPassword) {

        res.cookie("token", CorrectPassword);

        res.redirect('./FrontEnd/hospital.html');
    }
    else {
        res.status(401).send('Invalid username or password');
    }

});

app.get()

app.listen(3000, function () {

    console.log("server running on port 3000");

});