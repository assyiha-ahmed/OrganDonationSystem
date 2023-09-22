const btn = document.querySelector(".btn");

btn.addEventListener("click", (e) => {

    e.preventDefault()

    console.log("helooooooo")

    let UserName = document.querySelector(".userName").value;
    let Password = document.querySelector(".password").value;

    let adminsData ={
        userName: UserName,
        password: Password
    }

    console.log(adminsData)

    checkUser(adminsData);

fetch('http://localhost:5000/users/firstDonor', {
}).then(res => {
    return res.json();
})
    .then(data => {

});
})

function checkUser(data){
    console.log(data)
    fetch('http://localhost:5000/users/admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.text();
    })
        .then(data => console.log(data))
        .catch(error => console.log(error))
}

function checkUser(data){
    let name = data.userName;
    let password = data.password;

    console.log(name,password)

   if(name == "fenas" && password == "fenas1234"){
        window.location="http://localhost:5001/reqAdmin";
        alert("login successfully");
   }
   else{
    alert("Invalid Information!")
   }
}