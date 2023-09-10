let btn = document.querySelector('.btn');

btn.addEventListener("click",(e) =>{

    e.preventDefault();

    alert ("Request submited successfully");

    const name = document.querySelector('.name').value;
    const address = document.querySelector('.address').value;
    const emailAddress = document.querySelector('.email-address').value;

    let request={
        Name : name, 
        Address : address,
        EmailAddress : emailAddress
    }

        addData(request);

    
});

function addData(data){
    fetch('http://localhost:5000/users/reqAdmin',{
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