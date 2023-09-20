const express = require ("express");
const app = express();

app.use(express.static("public"));

app.get("/BackEnd" ,function(request , response){
    response.sendFile(__dirname+"./routes/users.js");
});

app.get("/hospital" ,function(request , response){
    
    response.sendFile(__dirname+"../FrontEnd/hospitalForm.html");

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

        res.redirect('./FrontEnd/hospital.html');
      }
       else {
        res.status(401).send('Invalid username or password');
      }

});

app.get()

app.listen(3000 , function(){

    console.log("server running on port 3000");

});