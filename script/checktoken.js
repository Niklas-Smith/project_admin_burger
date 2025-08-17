// om du inte har token så skickas du till login sidan. du kan häller inte se sidor utan token som denna omfatta.
if(!localStorage.getItem("burger_token")) {
  window.location.href = "login.html";
}




