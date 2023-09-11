const btn = document.querySelector(".btn");

btn.addEventListener("click", (e) => {

    e.preventDefault()

    console.log("helooooooo")

    let userName = document.querySelector(".userName").value;
    let password = document.querySelector(".password").value;

    console.log(userName,password)

    checkUser(userName,password);

fetch('http://localhost:5000/users/firstDonor', {
}).then(res => {
    return res.json();
})
    .then(data => {


});
})

function checkUser(userName,password){
   if(userName == "fenas" && password == "fenas1234"){
        window.location="reqAdmin.html";
        alert("login successfully");
   }
   else{
    alert("Invalid Information!")
   }
}