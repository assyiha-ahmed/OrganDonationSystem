let btn = document.querySelector('.btn');

btn.addEventListener("click",(e) =>{

    e.preventDefault();

    // alert ("Request submited successfully");

    const name = document.querySelector('.name').value;
    // const address = document.querySelector('.address').value;
    const emailAddress = document.querySelector('.email-address').value;

    const success = (position) =>{
        console.log(position)
        const latitude = position.coords.latitude;
        const longitude  = position.coords.longitude;

        const geoApiurl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
     
        fetch(geoApiurl)
        .then(res => res.json())
        .then(data =>{
           const City = data.city;
        })

    }

    const error = () =>{
        console.log("error");
    }

    navigator.geolocation.getCurrentPosition(success,error);


 

    let request={
        Name : name, 
        Address : City,
        EmailAddress : emailAddress
    }

        // addData(request);

    
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