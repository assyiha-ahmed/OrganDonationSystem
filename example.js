const btn = document.querySelector('.btn')
 
btn.addEventListener("click",(e) =>{

   e.preventDefault();

   let Name = document.querySelector('.name').value
   let City = document.querySelector('.city').value 

   if (Name && City) {
      const hospitalData={
        name : Name,
        city : City
      }

    }
    
    user.push(hospitalData);

});

let user = [
    // {
    //     name: "tedla",
    //     city: "addis"
    // },
    // {
    //     name: "abebe",
    //     city: "bishoftu"
    // }
]

let filtered = user.filter(function(value){
    return (
        value.city == "bishoftu" 
    )
    
});
 console.log(filtered);

 console.log(user)