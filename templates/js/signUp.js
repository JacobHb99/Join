let test123 = [];
let userLogin = [];


async function initLogin(){
  await loadUserLogin();
  await getMsg();
}


async function loadUserLogin() {
  let users = JSON.parse(await getItem("userLogin"));
  userLogin = users;
}


/**
 * Creates new account in form of a JSON and pushes it to the users array..
 */
async function signUp() {
  signUpbtn.disabled = true;
  userLogin.push({
    name: signUpName.value,
    email: signUpEmail.value,
    password: signUpPassword.value,
  });

  await setItem("userLogin", JSON.stringify(userLogin));
  resetForm();
  window.location.href = "login.html?msg=Du hast dich erfolgreich registriert";
}


/**
 * Brings you back to the login screen.
 */
function goBackToLogin() {
 window.location.href = "login.html";
} 


/**
 * Resets the textfields on the login screen.
 */
function resetForm() {
  signUpName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
  signUpbtn.disabled = false;
}