const btn = document.querySelector(".login");

btn.addEventListener("click",(e) =>{

    e.preventDefault();


    let UserName = document.querySelector(".userName").value;
    let Password = document.querySelector(".password").value;

    const hospitalData = {
        password: Password,
        userName: UserName
    }

    fetch('http://localhost:5000/hospitals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hospitalData)
    }).then(res => {
    return res.json();
})
.then(data => {
    console.log(data);

    if (data.location != undefined)
    window.location= data.location;



    // checkData(hospitalData);

// function checkData(data){

//     console.log(hospitals)

//     let validHospital = hospitals.find((hospital) => hospital.userName == data.userName);

//     console.log(validHospital)

//     let CorrectPassword = validHospital.passwordReal; 
//     let correctUsername = validHospital.userName;

//     console.log(CorrectPassword,correctUsername);

//     if(data.password == CorrectPassword && data.userName == correctUsername){
//         window.location="hospital.html";
//     }
// }
   

})

.catch(error => console.log(error))
    


    

});





// function addData(data){
//     fetch('http://localhost:5000/users/hospitalLogin', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     }).then(res => {
//         return res.text();
//     })
//         .then(data => console.log(data))
//         .catch(error => console.log(error))
// }



// const btn = document.querySelector(".login");

// btn.addEventListener("click", () => {
//     console.log("hello");
//     window.open("hospital.html", window.parent);

//     const page = document.querySelector(".page");
    
// });