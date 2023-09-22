let btn = document.querySelector('.btn');

btn.addEventListener("click",(e) =>{

    e.preventDefault();

    // alert ("Request submited successfully");

    const name = document.querySelector('.name').value;
    const address = document.querySelector('.address').value;
    const contactNo_ = document.querySelector('.contact-number').value;

    const success = (position) =>{
        console.log(position)
        const latitude = position.coords.latitude;
        const longitude  = position.coords.longitude;

        let request={
            Name : name, 
            Address : address,
            ContactNumber : contactNo_,
            lat : latitude,
            lng : longitude
        }
    
            addData(request);
            
        const geoApiurl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
     
        fetch(geoApiurl)
        .then(res => res.json())
        .then(data =>{
           const City = data.locality;
        })


    }

    const error = () =>{
        console.log("error");
    }

    navigator.geolocation.getCurrentPosition(success,error);


 

   

    
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
        .then(data => {
            alert(data);
        })
        .catch(error => console.log(error))
}