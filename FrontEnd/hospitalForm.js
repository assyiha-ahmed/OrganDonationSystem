const btn = document.querySelector(".login");

btn.addEventListener("click",(e) =>{

    e.preventDefault();

    let UserName = document.querySelector(".userName").value;
    let Password = document.querySelector(".password").value;

    const hospitalData = {
        password: Password,
        userName: UserName
    }

    console.log(hospitalData);

    addData(hospitalData)

});


function addData(data){
    fetch('http://localhost:5000/users/hospitalLogin', {
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














// const btn = document.querySelector(".login");

// btn.addEventListener("click", () => {
//     console.log("hello");
//     window.open("hospital.html", window.parent);

//     const page = document.querySelector(".page");
    
// });