let index = localStorage.getItem('index');


/**
 * Removes the css-attribute 'display: none', so the HTML-Element is shown.
 */
function popUpMessageEmail() {
    document.getElementById('buttonAnimationEmail').classList.remove('d-none');
}


/**
 * Adds the css-attribute 'display: none', so the HTML-Element is hidden.
 */
function popUpMessagePw() {
    document.getElementById('buttonAnimationPw').classList.remove('d-none');
}


/**
 * Searches for account who has forgot his password. And calls function to reset it.
 */
function resetPassword() {
    let email = document.getElementById('forgotPwEmail').value;
    popUpMessagePw();
    i = resetUserPassword(email);
    setTimeout(function () {
        window.location.href = "resetPassword.html";
    }, 1800);
    localStorage.setItem('index', i);
}


/**
 * Brings the use back to login, after changing the password.
 */
async function backToLogin() {
    popUpMessageEmail();
    await setNewPassword();
    setTimeout(function () {
        window.location.href = "login.html";
    }, 1800);
}


/**
 * 
 * @param {string} email - email of user, who has forgotten the password.
 * @returns {boolean} - If email has already an account.
 */
function resetUserPassword(email) {
    let i = userLogin.findIndex(function (a) {
        return a.email === email;
    });
    console.log(i);
    return i;
}


/**
 * Saves the new password.
 */
async function setNewPassword() {
    let password = document.getElementById('resetPassword').value;
    let passwordRepeat = document.getElementById('repeatPassword').value;
    if (password === passwordRepeat) {
        userLogin[index]['password'] = password;
        await setItem("userLogin", JSON.stringify(userLogin));
    }
}