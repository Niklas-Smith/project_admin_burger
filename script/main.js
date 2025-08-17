
//skapar variabler 
const nav = document.querySelector(".nav_ul")
const formForReg = document.querySelector("#form_reg")
const formForLogin = document.querySelector("#form_login")
const formForburger = document.querySelector("#burger_form")
const formForaccessories = document.querySelector("#accessories_form")
const formFordipp = document.querySelector("#dipp_form")
const formFordrink = document.querySelector("#drink_form")
const formForother = document.querySelector("#other_form")



// kör functionen init när sidan laddas
window.onload = init; 

function init()  {
   changeNav();
 //om formForReg finns ge det än addEventListener som på submit kallar functionen registerUser
if(formForReg) {
 
   formForReg.addEventListener("submit", registerUser)
      }
       //om formForLogin finns ge det än addEventListener som på submit kallar functionen registerUser
      if(formForLogin) {
  formForLogin.addEventListener("submit", loginUser)
}
 //om formForburger finns ge det än addEventListener som på submit kallar functionen registerUser
      if(formForburger) {
  formForburger.addEventListener("submit", addBurger)
}

      if(formForaccessories) {
  formForaccessories.addEventListener("submit", addAccessories)
}
      if(formFordipp) {
  formFordipp.addEventListener("submit", addDipp)
}

      if(formFordrink) {
  formFordrink.addEventListener("submit", addDrink)
}

      if(formForother) {
  formForother.addEventListener("submit", addOther)
}
}


//function som kollar om burger_token finns i localstorage och ändra hur html vissas
//  (du kan se dolda sidor) och logga ut om du har burger_token
function changeNav( ){


  if(localStorage.getItem("burger_token")) {
    nav.innerHTML = `
<li><a href="/index.html"><b>Startsida</b></a></li>
<li> <a href="/burger.html"><b>Burger</b></a></li> 
<li> <a href="/login.html" id="logout_button"><b>Logga ut</b></a></li> 


    
    `

  } else {
        nav.innerHTML = `
    <li><a href="/index.html"><b>Startsida</b></a></li>
<li><a href="/login.html"><b>logga in</b></a></li>
<li><a href="/register.html"><b>Registrera</b></a></li>
    
    `
    }
    //skapar variable
let logout = document.querySelector("#logout_button")

//om logout så kan man trycka på den för att ta bort burger_token och sedan skicka den dig till login.html
if(logout) {
logout.addEventListener("click", () => {

    localStorage.removeItem("burger_token")
    window.location.href = "login.html";
}

)

}
}





//function som gör att man kan logga in på sidan med ett post begären till ett api
async function loginUser(event)  {
    // gör att form inte ladda om sidan
    event.preventDefault();
         // skapar varibler som tar input value 
    let emailInput = document.getElementById("email").value;
    let passwordInput =  document.getElementById("password").value;

    if(!emailInput || !passwordInput ) {
       console.log("email eller lösenord kan inte vara tomt")
     return
    }
      // skapar ett object med email och password 
    let user = {
      email: emailInput,
      password: passwordInput

    }
    try{  // gör ett post begäran till http://127.0.0.1:3001/api/login som är ett api i backend delen
    const resp = await fetch ("http://127.0.0.1:3001/api/login", {
method : "POST",  
headers:{
"content-type": "application/json"

} ,

// skapar en Json sträng av user object
body: JSON.stringify(user) 
    })
if(resp.ok) {
    // om inloggning lyckas så skapas burger_token i localStorage. skicka dig sen till burger.html
    const data = await resp.json();
  localStorage.setItem("burger_token", data.response.token);
   window.location.href = "burger.html";
     console.log(data)

} else {

    throw error;
}
 
    } catch{
        console.log("fel email eller lösenord")
    }

}














//function som med hjälp av post begären till ett api gör att man kan Registrera sig på sidan 
async function registerUser(event) {
    
 // gör så inte formen laddas om
  event.preventDefault();
   // skapar variblerbler som tar input från value 
   let regemailInput = document.getElementById("email").value;
    let regusenameInput = document.getElementById("username").value;
    let regpasswordInput =  document.getElementById("password").value;
    


    if(!regemailInput || !regusenameInput || !regpasswordInput  ) {
       console.log("måste fylla i alla fält")
     return
    }
          // skapar ett object med email,username och password

    let register = {
        email: regemailInput,
      username: regusenameInput,
      password: regpasswordInput
    }

// gör ett post begäran till http://127.0.0.1:3001/api/register som är ett api i backend delen
    try{
    const resp = await fetch ("http://127.0.0.1:3001/api/register", {
method : "POST",
headers:{
"content-type": "application/json",

} ,   // skapar en Json sträng av register object
body: JSON.stringify(register) 
    })
     // om man Registrera skicka sig så skickas man till login.html
if(resp.ok) {
    const data = await resp.json();

   window.location.href = "login.html";

} else {

    throw error;
}

 


    } catch (error){
        console.log("Något blev fel" + error );

    }




}


