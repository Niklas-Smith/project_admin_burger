//skapar varible med en tom array 
let burgerApi = [] 
let accessoriesApi = []
let dipsApi = []
let drinkApi = []
let otherApi = []



//skapar variabler 
const nav = document.querySelector(".nav_ul")
const formForReg = document.querySelector("#form_reg")
const formForLogin = document.querySelector("#form_login")

const formForburger = document.querySelector("#burger_form")
const formForaccessories = document.querySelector("#accessories_form")
const formFordipp = document.querySelector("#dipp_form")
const formFordrink = document.querySelector("#drink_form")
const formForother = document.querySelector("#other_form")

const formUpdateOther  = document.querySelector("#otherUpdate_form")
const formUpdateBurger  = document.querySelector("#burgerUpdate_form")
const formUpdateAccessories  = document.querySelector("#accessoriesUpdate_form")
const formUpdateDipp  = document.querySelector("#dippUpdate_form")
const formUpdateDrink  = document.querySelector("#drinkUpdate_form")

// kör functionen init när sidan laddas
window.onload = init; 

function init()  {
   changeNav();
 //om formForReg finns ge det än addEventListener som på submit kallar functionen registerUser
if(formForReg) {
 
   formForReg.addEventListener("submit", registerUser)
      }
       //om formForLogin finns ge det än addEventListener som på submit kallar functionen loginUser
      if(formForLogin) {
  formForLogin.addEventListener("submit", loginUser)
}
 //om formForburger finns ge det än addEventListener som på submit kallar functionen addBurger
      if(formForburger) {
  formForburger.addEventListener("submit", addBurger)
}
//om formForaccessories finns ge det än addEventListener som på submit kallar functionen addAccessories
      if(formForaccessories) {
  formForaccessories.addEventListener("submit", addAccessories)
}
//om formFordipp finns ge det än addEventListener som på submit kallar functionen addDipp
      if(formFordipp) {
  formFordipp.addEventListener("submit", addDipp)
}

//om formFordrink finns ge det än addEventListener som på submit kallar functionen addDrink
      if(formFordrink) {
  formFordrink.addEventListener("submit", addDrink)
}

//om formForother finns ge det än addEventListener som på submit kallar functionen addOther
      if(formForother) {
  formForother.addEventListener("submit", addOther)
}
//om formUpdateOther finns ge det än addEventListener som på submit kallar functionen uppdateOther
      if(formUpdateOther) {
  formUpdateOther.addEventListener("submit", uppdateOther)
}
//om formUpdateBurger finns ge det än addEventListener som på submit kallar functionen uppdateBurger
      if(formUpdateBurger) {
  formUpdateBurger.addEventListener("submit", uppdateBurger)
}

//om formUpdateAccessories finns ge det än addEventListener som på submit kallar functionen uppdateAccessories
      if(formUpdateAccessories) {
  formUpdateAccessories.addEventListener("submit", uppdateAccessories)
}
//om formUpdateDipp finns ge det än addEventListener som på submit kallar functionen uppdateDipp
      if(formUpdateDipp) {
  formUpdateDipp.addEventListener("submit", uppdateDipp)
}

//om formUpdateDrink finns ge det än addEventListener som på submit kallar functionen uppdateDrink
      if(formUpdateDrink) {
  formUpdateDrink.addEventListener("submit", uppdateDrink)
}


getBurgers();
getAccessories();
getDips();
getDrink();
getOther();

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


//function som gör att man kan lägga till Hamburger om du är inloggad och har burger_token med ett post begären till ett api
async function addBurger(event) {


   // gör att form inte ladda om sida
        event.preventDefault();
   // skapar varibler som tar input value 
    let burgerNameInput = document.getElementById("burgername").value;
    let weightproteinInput =  document.getElementById("weightprotein").value;
   let  accessoriesoneInput =  document.getElementById("accessoriesone").value;
    let accessoriestwoInput =  document.getElementById("accessoriestwo").value;
       let priceoneInput =  document.getElementById("priceone").value;
          let pricetwoInput =  document.getElementById("pricetwo").value;

    if(!burgerNameInput || !weightproteinInput ||!accessoriesoneInput ||!accessoriestwoInput||!priceoneInput||!pricetwoInput ) {
       console.log("måste fylla i alla fält")
     return
    }
      // skapar ett object med burgername, weightprotein, accessoriesone, accessoriestwo, priceone and pricetwo
    let burgers = {
      burgername: burgerNameInput,
      weightprotein: weightproteinInput,
      accessoriesone:accessoriesoneInput,
      accessoriestwo:accessoriestwoInput,
        priceone:priceoneInput,
          pricetwo:pricetwoInput

    }
   // skapar ett varibler som hämtar in burger_token från localStorage
const token = localStorage.getItem("burger_token")
    // gör ett post begäran och skicka med token till http://127.0.0.1:3001/api/burgers är ett api i backend delen
    try{
    const resp = await fetch ("http://127.0.0.1:3001/api/burgers", {
method : "POST",
headers:{
"content-type": "application/json",
"Authorization": "Bearer " + token


} ,   // skapar en Json sträng av burgers object
body: JSON.stringify(burgers) 
    })
if(resp.ok) {
    const data = await resp.json();
    console.log(data);
// reset formForburger form
    formForburger.reset()

} else {

    throw error;
}

 


    } catch (error){
        console.log("Något blev fel" + error );

    }
    
}





//function som gör att man kan lägga till tillbehör om du är inloggad och har burger_token med ett post begären till ett api
async function addAccessories(event) {


   // gör att form inte ladda om sida
        event.preventDefault();
   // skapar varibler som tar input value 
    let accessoriesNameInput = document.getElementById("accessoriesname").value;
    let accessoriesPricceInput =  document.getElementById("accessoriesprice").value;
   let  accessoriesContentInput =  document.getElementById("accessoriescontent").value;


    if(!accessoriesNameInput || !accessoriesPricceInput ||!accessoriesContentInput) {
       console.log("måste fylla i alla fält")
     return
    }
      // skapar ett object med accessoriesname, accessoriesprice and accessoriescontent
    let accessories = {
      accessoriesname: accessoriesNameInput,
      accessoriesprice: accessoriesPricceInput,
      accessoriescontent:accessoriesContentInput

    }
   // skapar ett varibler som hämtar in burger_token från localStorage
const token = localStorage.getItem("burger_token")
    // gör ett post begäran och skicka med token till http://127.0.0.1:3001/api/accessories är ett api i backend delen
    try{
    const resp = await fetch ("http://127.0.0.1:3001/api/accessories", {
method : "POST",
headers:{
"content-type": "application/json",
"Authorization": "Bearer " + token


} ,   // skapar en Json sträng av accessories object
body: JSON.stringify(accessories) 
    })
if(resp.ok) {
    const data = await resp.json();
    console.log(data);
// reset formForaccessories form
    formForaccessories.reset()

} else {

    throw error;
}

 


    } catch (error){
        console.log("Något blev fel" + error );

    }
    
}




//function som gör att man kan lägga till dippar om du är inloggad och har burger_token med ett post begären till ett api
async function addDipp(event) {


   // gör att form inte ladda om sida
        event.preventDefault();
   // skapar varibler som tar input value 
    let dipNameInput = document.getElementById("dipsname").value;
    let dipPricceInput =  document.getElementById("dipsprice").value;
   let  dipContentInput =  document.getElementById("dipscontent").value;


    if(!dipNameInput || !dipPricceInput ||!dipContentInput) {
       console.log("måste fylla i alla fält")
     return
    }
      // skapar ett object med dipsname, dipsprice and dipscontent
    let dipp = {
      dipsname: dipNameInput,
      dipsprice: dipPricceInput,
      dipscontent:dipContentInput

    }
   // skapar ett varibler som hämtar in burger_token från localStorage
const token = localStorage.getItem("burger_token")
    // gör ett post begäran och skicka med token till http://127.0.0.1:3001/api/dips är ett api i backend delen
    try{
    const resp = await fetch ("http://127.0.0.1:3001/api/dips", {
method : "POST",
headers:{
"content-type": "application/json",
"Authorization": "Bearer " + token


} ,   // skapar en Json sträng av dipp object
body: JSON.stringify(dipp) 
    })
if(resp.ok) {
    const data = await resp.json();
    console.log(data);
// reset formForaccessories form
    formFordipp.reset()

} else {

    throw error;
}

 


    } catch (error){
        console.log("Något blev fel" + error );

    }
    
}




//function som gör att man kan lägga till dryck om du är inloggad och har burger_token med ett post begären till ett api
async function addDrink(event) {


   // gör att form inte ladda om sida
        event.preventDefault();
   // skapar varibler som tar input value 
    let drinkNameInput = document.getElementById("drinkname").value;
    let drinkPricceInput =  document.getElementById("drinkprice").value;



    if(!drinkNameInput || !drinkPricceInput) {
       console.log("måste fylla i alla fält")
     return
    }
      // skapar ett object med drinkname and drinkprice
    let drink = {
      drinkname: drinkNameInput,
      drinkprice: drinkPricceInput
    }
   // skapar ett varibler som hämtar in burger_token från localStorage
const token = localStorage.getItem("burger_token")
    // gör ett post begäran och skicka med token till http://127.0.0.1:3001/api/drink är ett api i backend delen
    try{
    const resp = await fetch ("http://127.0.0.1:3001/api/drink", {
method : "POST",
headers:{
"content-type": "application/json",
"Authorization": "Bearer " + token


} ,   // skapar en Json sträng av drink object
body: JSON.stringify(drink) 
    })
if(resp.ok) {
    const data = await resp.json();
    console.log(data);
// reset formFordrink form
    formFordrink.reset()

} else {

    throw error;
}

 


    } catch (error){
        console.log("Något blev fel" + error );

    }
    
}




//function som gör att man kan lägga till extra om du är inloggad och har burger_token med ett post begären till ett api
async function addOther(event) {


   // gör att form inte ladda om sida
        event.preventDefault();
   // skapar varibler som tar input value 
    let otherNameInput = document.getElementById("othername").value;
    let otherPricceInput =  document.getElementById("otherprice").value;



    if(!otherNameInput || !otherPricceInput) {
       console.log("måste fylla i alla fält")
     return
    }
      // skapar ett object med drinkname and drinkprice
    let other = {
      othername: otherNameInput,
      otherprice: otherPricceInput
    }
   // skapar ett varibler som hämtar in burger_token från localStorage
const token = localStorage.getItem("burger_token")
    // gör ett post begäran och skicka med token till http://127.0.0.1:3001/api/other är ett api i backend delen
    try{
    const resp = await fetch ("http://127.0.0.1:3001/api/other", {
method : "POST",
headers:{
"content-type": "application/json",
"Authorization": "Bearer " + token


} ,   // skapar en Json sträng av other object
body: JSON.stringify(other) 
    })
if(resp.ok) {
    const data = await resp.json();
    console.log(data);
// reset formForother form
    formForother.reset()

} else {

    throw error;
}

 


    } catch (error){
        console.log("Något blev fel" + error );

    }
    
}










//function som gör att man kan uppdatera Hamburger om du är inloggad och har burger_token med ett put begären till ett api baserat på id
async function uppdateBurger(event) {


   // gör att form inte ladda om sida
        event.preventDefault();
   // skapar varibler som tar input value 

    let id = document.getElementById("id").value;
    let burgerNameInput = document.getElementById("burgername2").value;
    let weightproteinInput =  document.getElementById("weightprotein2").value;
   let  accessoriesoneInput =  document.getElementById("accessoriesone2").value;
    let accessoriestwoInput =  document.getElementById("accessoriestwo2").value;
       let priceoneInput =  document.getElementById("priceone2").value;
          let pricetwoInput =  document.getElementById("pricetwo2").value;

    if(!id ||!burgerNameInput || !weightproteinInput ||!accessoriesoneInput ||!accessoriestwoInput||!priceoneInput||!pricetwoInput ) {
       console.log("måste fylla i alla fält")
     return
    }
      // skapar ett object med burgername, weightprotein, accessoriesone, accessoriestwo, priceone and pricetwo
    let burgers = {
      burgername: burgerNameInput,
      weightprotein: weightproteinInput,
      accessoriesone:accessoriesoneInput,
      accessoriestwo:accessoriestwoInput,
        priceone:priceoneInput,
          pricetwo:pricetwoInput

    }
   // skapar ett varibler som hämtar in burger_token från localStorage
const token = localStorage.getItem("burger_token")
    // gör ett put begäran och skicka med token till http://127.0.0.1:3001/api/burgers/:id är ett api i backend delen (du skickar med id)
    try{
    const resp = await fetch (`http://127.0.0.1:3001/api/burgers/${id}`, {
method : "PUT",
headers:{
"content-type": "application/json",
"Authorization": "Bearer " + token


} ,   // skapar en Json sträng av burgers object
body: JSON.stringify(burgers) 
    })
if(resp.ok) {
    const data = await resp.json();
    console.log(data);
// reset formUpdateBurger form
    formUpdateBurger.reset()

} else {

    throw error;
}

 


    } catch (error){
        console.log("Något blev fel" + error );

    }
    
}







//function som gör att man kan uppdaterad tillbehör om du är inloggad och har burger_token med ett put begären till ett api baserat på id
async function uppdateAccessories(event) {


   // gör att form inte ladda om sida
        event.preventDefault();
   // skapar varibler som tar input value 
   let id = document.getElementById("idtwo").value;
    let accessoriesNameInput = document.getElementById("accessoriesname2").value;
    let accessoriesPricceInput =  document.getElementById("accessoriesprice2").value;
   let  accessoriesContentInput =  document.getElementById("accessoriescontent2").value;


    if(!id ||!accessoriesNameInput || !accessoriesPricceInput ||!accessoriesContentInput) {
       console.log("måste fylla i alla fält")
     return
    }
      // skapar ett object med accessoriesname, accessoriesprice and accessoriescontent
    let accessories = {
      accessoriesname: accessoriesNameInput,
      accessoriesprice: accessoriesPricceInput,
      accessoriescontent:accessoriesContentInput

    }
   // skapar ett varibler som hämtar in burger_token från localStorage
const token = localStorage.getItem("burger_token")
    // gör ett post begäran och skicka med token till http://127.0.0.1:3001/api/accessories:id är ett api i backend delen(du skickar med id)
    try{
    const resp = await fetch (`http://127.0.0.1:3001/api/accessories/${id} `, {
method : "PUT",
headers:{
"content-type": "application/json",
"Authorization": "Bearer " + token


} ,   // skapar en Json sträng av accessories object
body: JSON.stringify(accessories) 
    })
if(resp.ok) {
    const data = await resp.json();
    console.log(data);
// reset formUpdateAccessories form
    formUpdateAccessories.reset()

} else {

    throw error;
}

 


    } catch (error){
        console.log("Något blev fel" + error );

    }
    
}









//function som gör att man kan updatera dippar om du är inloggad och har burger_token med ett put begären till ett api baserat på id 
async function uppdateDipp(event) {


   // gör att form inte ladda om sida
        event.preventDefault();
   // skapar varibler som tar input value 
   let id = document.getElementById("idthree").value;
    let dipNameInput = document.getElementById("dipsname2").value;
    let dipPricceInput =  document.getElementById("dipsprice2").value;
   let  dipContentInput =  document.getElementById("dipscontent2").value;


    if(!id ||!dipNameInput || !dipPricceInput ||!dipContentInput) {
       console.log("måste fylla i alla fält")
     return
    }
      // skapar ett object med dipsname, dipsprice and dipscontent
    let dipp = {
      dipsname: dipNameInput,
      dipsprice: dipPricceInput,
      dipscontent:dipContentInput

    }
   // skapar ett varibler som hämtar in burger_token från localStorage
const token = localStorage.getItem("burger_token")
    // gör ett post begäran och skicka med token till http://127.0.0.1:3001/api/dips/:id är ett api i backend delen(du skickar med id)
    try{
    const resp = await fetch (`http://127.0.0.1:3001/api/dips/${id} `, {
method : "PUT",
headers:{
"content-type": "application/json",
"Authorization": "Bearer " + token


} ,   // skapar en Json sträng av dipp object
body: JSON.stringify(dipp) 
    })
if(resp.ok) {
    const data = await resp.json();
    console.log(data);
// reset formUpdateDipp form
    formUpdateDipp.reset()

} else {

    throw error;
}

 


    } catch (error){
        console.log("Något blev fel" + error );

    }
    
}











//function som gör att man kan uppdater dryck om du är inloggad och har burger_token med ett put begären till ett api baserat på id
async function uppdateDrink(event) {


   // gör att form inte ladda om sida
        event.preventDefault();
   // skapar varibler som tar input value 
     let id = document.getElementById("idfour").value;
    let drinkNameInput = document.getElementById("drinkname2").value;
    let drinkPricceInput =  document.getElementById("drinkprice2").value;



    if(!drinkNameInput || !drinkPricceInput) {
       console.log("måste fylla i alla fält")
     return
    }
      // skapar ett object med drinkname and drinkprice
    let drink = {
      drinkname: drinkNameInput,
      drinkprice: drinkPricceInput
    }
   // skapar ett varibler som hämtar in burger_token från localStorage
const token = localStorage.getItem("burger_token")
    // gör ett post begäran och skicka med token till http://127.0.0.1:3001/api/drink:id är ett api i backend delen (du skickar med id)
    try{
    const resp = await fetch (`http://127.0.0.1:3001/api/drink/${id}`, {
method : "PUT",
headers:{
"content-type": "application/json",
"Authorization": "Bearer " + token


} ,   // skapar en Json sträng av drink object
body: JSON.stringify(drink) 
    })
if(resp.ok) {
    const data = await resp.json();
    console.log(data);
// reset formFordrink form
    formUpdateDrink.reset()

} else {

    throw error;
}

 


    } catch (error){
        console.log("Något blev fel" + error );

    }
    
}














//function som gör att man kan uppdatera extra om du är inloggad och har burger_token med ett put begären till ett api baserat på id
async function uppdateOther(event) {


   // gör att form inte ladda om sida
        event.preventDefault();
   // skapar varibler som tar input value 
       let id = document.getElementById("idfive").value;
    let otherNameInput = document.getElementById("othername2").value;
    let otherPricceInput =  document.getElementById("otherprice2").value;



    if(!id ||!otherNameInput || !otherPricceInput) {
       console.log("måste fylla i alla fält")
     return
    }
      // skapar ett object med drinkname and drinkprice
    let other = {
      othername: otherNameInput,
      otherprice: otherPricceInput
    }
   // skapar ett varibler som hämtar in burger_token från localStorage
const token = localStorage.getItem("burger_token")
    // gör ett put begäran och skicka med token till http://127.0.0.1:3001/api/other/:id är ett api i backend delen (du skickar med id)
    try{
    const resp = await fetch (`http://127.0.0.1:3001/api/other/${id}`, {
method : "PUT",
headers:{
"content-type": "application/json",
"Authorization": "Bearer " + token


} ,   // skapar en Json sträng av other object
body: JSON.stringify(other) 
    })
if(resp.ok) {
    const data = await resp.json();
    console.log(data);
// reset formUpdateOther form
    formUpdateOther.reset()

} else {

    throw error;
}

 


    } catch (error){
        console.log("Något blev fel" + error );

    }
    
}



//function som hämtar data från http://127.0.0.1:3001/api/burgers och lagra i tom array burgerApi

async function getBurgers()  {
try {

const resp = await fetch ("http://127.0.0.1:3001/api/burgers")


if(!resp.ok) {
 throw new error("Något blev fel...")
    
 }

burgerApi = await resp.json();

loadBurgers()

 }catch(error) {
 console.error(error); }
 
}
//function som hämtar data från http://127.0.0.1:3001/api/accessories och lagra i tom array accessoriesApi
async function getAccessories()  {
try {

const resp = await fetch ("http://127.0.0.1:3001/api/accessories")


if(!resp.ok) {
 throw new error("Något blev fel...")
    
 }

accessoriesApi = await resp.json();
loadAccessories()
console.log(accessoriesApi);

 }catch(error) {
 console.error(error); }
 
}



//function som hämtar data från http://127.0.0.1:3001/api/dips och lagra i tom array dipsApi
async function getDips()  {
try {

const resp = await fetch ("http://127.0.0.1:3001/api/dips")


if(!resp.ok) {
 throw new error("Något blev fel...")
    
 }

dipsApi = await resp.json();

console.log(dipsApi);

 }catch(error) {
 console.error(error); }
 
}

//function som hämtar data från http://127.0.0.1:3001/api/drink och lagra i tom array dipsApi
async function getDrink()  {
try {

const resp = await fetch ("http://127.0.0.1:3001/api/drink")


if(!resp.ok) {
 throw new error("Något blev fel...")
    
 }

drinkApi = await resp.json();

console.log(drinkApi);

 }catch(error) {
 console.error(error); }
 
}


//function som hämtar data från http://127.0.0.1:3001/api/other och lagra i tom array otherApi
async function getOther()  {
try {

const resp = await fetch ("http://127.0.0.1:3001/api/other")


if(!resp.ok) {
 throw new error("Något blev fel...")
    
 }

otherApi = await resp.json();

console.log(otherApi);

 }catch(error) {
 console.error(error); }
 
}





/* function som skapar en del av tabell som se ut så här:
<tr>
    <td> information från api  </td>
    <td> information från api </td>
    <td> information från api </td>
     <td> information från api </td>
      <td> button med id från api </td>
  </tr>

*/
function loadBurgers()  {
let burgerInfo = burgerApi
let burgerTbody = document.querySelector(".tbody_burger")


burgerTbody.innerHTML = ""


burgerInfo.forEach(burger => {
    // skapar tr element
    const burgerTrEl = document.createElement("tr")
// skapar td element med text från api 
    const burgerNameEl = document.createElement("td")
    burgerNameEl.textContent = burger.burgername
     burgerTrEl.appendChild(burgerNameEl)

// skapar td element med text från api 
     const accessoriesoneEl = document.createElement("td")
     accessoriesoneEl.textContent = burger.accessoriesone
burgerTrEl.appendChild(accessoriesoneEl)

// skapar td element med text från api 
     const priceOneEl = document.createElement("td")
     priceOneEl.textContent = burger.priceone
burgerTrEl.appendChild(priceOneEl)

// skapar td element med text från api 
     const priceTwoEl = document.createElement("td")
     priceTwoEl.textContent = burger.priceone
burgerTrEl.appendChild(priceTwoEl)
// skapar knapp element med text "remove" och ger id från api 
    const buttonTd = document.createElement("td")
   const burgerButton = document.createElement("button")
    burgerButton.textContent = "Remove"
    burgerButton.id = burger.id

    buttonTd.appendChild(burgerButton)
     burgerTrEl.appendChild(buttonTd)
     // ge knapp addEventListener som med click anropa function removeBurger
     burgerButton.addEventListener("click", removeBurger)

     burgerTbody.appendChild(burgerTrEl)

}

)
 }



 
/* function som skapar en del av tabell som se ut så här:
<tr>
    <td> information från api  </td>
    <td> information från api </td>
    <td> information från api </td>
      <td> button med id från api </td>
  </tr>

*/
function loadAccessories()  {
let accessoriesInfo = accessoriesApi
let  accessoriesTbody = document.querySelector(".tbody_accessories")


accessoriesTbody.innerHTML = ""


accessoriesInfo.forEach(accessorie => {
    // skapar tr element
    const accessoriesTrEl = document.createElement("tr")
// skapar td element med text från api 
    const accessoriesNameEl = document.createElement("td")
    accessoriesNameEl.textContent = accessorie.accessoriesname
   accessoriesTrEl.appendChild(accessoriesNameEl)

// skapar td element med text från api 
     const accessoriesPriceEl = document.createElement("td")
     accessoriesPriceEl.textContent = accessorie.accessoriesprice
accessoriesTrEl.appendChild(accessoriesPriceEl)

// skapar td element med text från api 
     const accessoriescontentEl = document.createElement("td")
     accessoriescontentEl.textContent = accessorie.accessoriescontent
accessoriesTrEl.appendChild(accessoriescontentEl)


// skapar knapp element med text "remove" och ger id från api 
    const buttonTdAccessories = document.createElement("td")
   const accessoriesButton = document.createElement("button")
    accessoriesButton.textContent = "Remove"
    accessoriesButton.id = accessorie.id

    buttonTdAccessories.appendChild(accessoriesButton)
     accessoriesTrEl.appendChild(buttonTdAccessories)


     accessoriesTbody.appendChild(accessoriesTrEl)

          // ge knapp addEventListener som med click anropa function removeBurger
     accessoriesButton.addEventListener("click", removeAccessories)

}

)
 }










//function som gör att man ta bort från meny med ett DELETE begären till ett api
async function removeBurger(event)  {

  
    
  let burgerId = event.target.id


    try{  // gör ett DELETE begäran till http://127.0.0.1:3001/api/burgers/${burgerId} som är ett api i backend delen och skicka med id för ta bort rätt
    const resp = await fetch (`http://127.0.0.1:3001/api/burgers/${burgerId}`, {
method : "DELETE",  
headers:{
"content-type": "application/json"

} ,



    })
if(resp.ok) {

    const data = await resp.json();
     console.log(data)
     getBurgers()


}  else {

    throw error;
}
 
    } catch{
        console.log("Något blev fel")
    }



}



