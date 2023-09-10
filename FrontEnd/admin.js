const btn=document.querySelector(".btn");

btn.addEventListener("click", (e) => {

    e.preventDefault()
  
    let requesthos = [];

fetch('http://localhost:5000/users/firstDonor', {
}).then(res => {
    return res.json();
})
    .then(data => {


});
})