const btn = document.querySelector('.btn-upload')
 
btn.addEventListener("click",(e) =>{

   e.preventDefault();

    let Name=document.querySelector('.name').value
    let Age=document.querySelector('.age').value
    let blood_type=document.querySelector('.blood-type').value
    let HLA_A=document.querySelector('.hla-a').value
    let HLA_B=document.querySelector('.hla-b').value
    let HLA_DR=document.querySelector('.hla-dr').value
    let HLA_DQ=document.querySelector('.hla-dq').value
    let Size=document.querySelector('.size').value
    let Date=document.querySelector('.date').value
 if (Name && Age && blood_type) {
    const donorsData={
        name:Name,
        age:Age,
        bloodType:blood_type,
        hla_a : HLA_A,
        hla_b : HLA_B,
        hla_dr : HLA_DR,
        hla_dq : HLA_DQ,
        size : Size,
        date: Date
    }

    alert("donors detail added successfully");
    
    addData(donorsData);
 } else {
    alert("Please fill all the information!")
 }

});

function addData(data){
    fetch('http://localhost:5000/users/donor', {
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
// const btn=document. querySelector('.btn-upload')
// btn addEventListener(click (e) =>)
