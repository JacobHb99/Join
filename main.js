let allContacts = [];
let lastActivePage = 'sidebarSummary';

/**
 * Calls functions to load all important data like contacts and tasks.
 */
async function init() {
    await loadContacts();
    await loadTasks();
    includeHTML();
    initSummary();
    removeClassContentSectionAddTask();
}


/**
 * Calls function to render the summary-screen.
 */
function renderSummary() {
    initSummary();
    let sidebarSummary = document.getElementById('sidebarSummary');
    highlightSidebarBtn(sidebarSummary);
    lastActivePage = 'sidebarSummary';
}


/**
 * Calls function to render the board-screen.
 */
function renderBoard() {
    giveTaskId();
    renderBoardHTML();
    let sidebarBoard = document.getElementById('sidebarBoard');
    highlightSidebarBtn(sidebarBoard);
    lastActivePage = 'sidebarBoard';
}


/**
 * Calls function to render the add task screen.
 */
function renderAddTask() {
    initAddTask();
    let sidebarAddTask = document.getElementById('sidebarAddTask');
    highlightSidebarBtn(sidebarAddTask);
    lastActivePage = 'sidebarAddTask';
}


/**
 * Renders the contact screen.
 */
function renderContacts() {
    initContacts();
    let sidebarContacts = document.getElementById('sidebarContacts');
    highlightSidebarBtn(sidebarContacts);
    lastActivePage = 'sidebarContacts';
}


/**
 * Renders the legal-notice screen.
 */
function showLegalNoticeScreen() {
    contentSection.innerHTML = generateLegalNoticeScreenHTML();
    let sidebarLegal = document.getElementById('sidebarLegal');
    document.getElementById('headerContentRightLogout').style.display = 'none';
    highlightSidebarBtn(sidebarLegal);
}


/**
 * Shows the help screen and hides hides the logout button.
 */
function showHelpScreen() {
    contentSection.innerHTML = generateHelpScreenHTML();
    let helpLogoBtn = document.getElementById('helpLogoBtn');
    document.getElementById('headerContentRightLogout').style.display = 'none';
    highlightSidebarBtn(helpLogoBtn);
}


/**
 * creates variables with the information from the contact data.
 * @param {JSON} allData - all contact informations.
 * @returns {} - 
 */
function getJoinData(allData) {
    let name = allData['name'];
    let email = allData['email'];
    let phone = allData['phone'];
    let color = allData['color'];
    let initials = allData['initials'];
    let group = allData['group'];
    return { name, email, phone, color, initials, group };
}


/**
 * Prevents onclick events from being triggered.
 * @param {event} event 
 */
function doNotClose(event) {
    event.stopPropagation();
}


/**
 * Brings you back to the login screen and removes the current e-mail from the local storage.
 */
function logOut() {
    window.location.replace("./templates/html/login.html");
    localStorage.removeItem("currentEmail");
}


function showLogOut() {
    if (document.getElementById('headerContentRightLogout').style.display == 'none') {
        document.getElementById('headerContentRightLogout').style.display = 'block';
    } else {
        document.getElementById('headerContentRightLogout').style.display = 'none';
    }
}


/**
 * Adds the css-class background: #091931 to the active sidebar button.
 * @param {HTMLElement} element 
 */
function highlightSidebarBtn(element) {
    const buttons = document.getElementsByClassName('sidebarBtn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('sidebarBtnActive');
    }
    element.classList.add('sidebarBtnActive');
}


/**
 * Brings you bak to the last active page.
 */
function returnToLastActivePage() {
    let nextScreen = document.getElementById(`${lastActivePage}`);
    nextScreen.click();
}


/**
 * Hides the add task screen.
 */
function removeClassContentSectionAddTask() {
    document.getElementById('contentSection').classList.remove('contentSectionAddTask');
}