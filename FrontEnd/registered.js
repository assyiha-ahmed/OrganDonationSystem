    let Address = document.querySelector('.address').value
    let Age = document.querySelector('.age').value
    let Country = document.querySelector(".country").value
    let FullName =document.querySelector(".fname").value
    let ContactNumber = document.querySelector(".contactNumber").value
    let donatingTime = document.querySelector(".when").value

const donorsData={
    name:FullName,
    age:Age,
    country : Country,
    address : Address,
    contactNumber : ContactNumber,
    when : donatingTime
}



addData(donorsData);



let registered = [

    {
       city :"addisAbeba",
       Name : "kidus_paulos"
    },

    {
        city : "bishoftu",
        Name : "Bishoftu_Hospital" 
    },
    {
        city : "adama",
        Name : "Adama_General_Hospital"
    },
    {
        city : "modjo",
        Name : "Modjo_Primary"
    }

];

function  addData(data){

    fetch('http://localhost:5000/users/preRegistrationOfDonors',{
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

        

//         let filtered = registered.filter(function(value){
//             return (
//                 value.city == data.address 
//             )
            
//         });
//     // let place = value.city;
    
// console.log(filtered);
let place;

        for(let i = 0 ; i < registered.length; i++){
            if(data.address == registered[i].address){
               place = registered[i].Name;
            }

        }


        let p = document.createElement("div");  
        p.classList.add("myP");  
        p.textContent = place;

        console.log(p);

        let head = document.createElement("h1");
        head.classList.add("head");
        head.textContent = "CONGRADULATION!";

        let last = document.createElement("h1");
        last.classList.add("last");
        last.textContent = "YOU HAVE THE POWER TO CHANGE LIFE!";

        let h2 = document.createElement("h2");
        h2.classList.add("h2");
        h2.textContent = `Dear [${data.name}],`;

        let p1 = document.createElement("p");
        p1.classList.add("p1");
        p1.textContent = "Thank you for registering as an organ donor and demonstrating your incredible generosity. Your decision to give the gift of life is truely commendable. We are here to guide you through the next steps of the process to ensure a smooth and informed journey."
        p1.style.fontSize = "25px";

        let p2 = document.createElement("p");
        p2.classList.add("p2");
        p2.textContent = " After compliting the registration process, the next important step is to undergo some preliminary checkups and evaluations. This assessments are necessary to determine your eligibility as an organ donor and ensure the best possible outcomes for both donors and recipients."
        p2.style.fontSize = "25px";

        let p3 = document.createElement("p");
        p3.classList.add("p3");
        p3.textContent = `We kindly request that you proceed to ${place}.`;
        p3.style.fontSize = "25px";

        // place.style.backgroundColor

        let div= document.querySelector(".send");
        div.innerHTML = "";
       
        
        
        div.appendChild(head);
        div.appendChild(h2);
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);

        
}