const express = require ("express");
const app = express();

app.use(express.static("public"));


app.get("/" ,function(request , response){
    response.sendFile(__dirname+"/preRegistration.html");
});

app.get("/registered" ,function(request , response){
    response.sendFile(__dirname+"/registered.html");
});

app.post("/" , function(req , res){
    
});

app.listen(8000 , function(){

    console.log("server running on port 8000");

});