/**
 * 
 */
function getMsg() {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");
  if (msg) {
    document.getElementById("msgBox").innerHTML = `${msg}`;
    document.getElementById("msgBoxDiv").classList.remove("d-none");
  } else {
    document.getElementById("msgBoxDiv").classList.remove("d-flex");
  }
}


/**
 * Brings you to the sign up screen.
 */
function leadToSignUp() {
  window.location.href = "signUp.html";
}


/**
 * You will be logged in as a guest and will be taken to the summary page.
 */
function guestLogIn() {
  window.location.replace("../../index.html");
}


/**
 * Checks whether the specified data matches a saved account. If this is the case, you will be logged in
 */
async function login() {
  let email = document.getElementById("loginEmail");
  let password = document.getElementById("loginPassword");
  let user = userLogin.find(
    (u) => u.email == email.value && u.password == password.value
  );
  localStorage.setItem('currentEmail', email.value);
  console.log(user);
  if (user) {
    window.location.replace("../../index.html");
  } else {
    document.getElementById("msgBox").innerHTML = `Email oder Passwort nicht korrekt!`;
    document.getElementById("msgBoxDiv").classList.remove("d-none");
  }
}