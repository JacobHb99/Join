let earliest = [];
greeted = false;


/**
 * Renders all HTML-Templates for the summary-homescreen, and loads all informations about the User.
 */
async function initSummary() {
  await loadUserLogin();
  let currentUser = getCurrentUser();
  document.getElementById('contentSection').innerHTML = getSummarySection();
  document.getElementById('headlineDiv').innerHTML += getSummaryHeadlineDiv();
  document.getElementById('contentAndGreeting').innerHTML += getSummaryinnerContent();
  if(!greeted) {
    document.getElementById('contentAndGreeting').innerHTML += getSummaryGreeting(currentUser);
    greeted = true;
  }
  loadTaskStat();
  searchDate();
  searchUrgentTasks()
  removeClassContentSectionAddTask();
}


/**
 * Checks whether someone has logged in with their own account or as a guest.
 * @returns {string} - name of the User or Guest.
 */
function getCurrentUser() {
  let name;
  let email = localStorage.getItem('currentEmail');
  let index = userLogin.findIndex(function (currentUser) {
    return currentUser.email === email;
  });
  if (email) {
    name = userLogin[index]['name'];
  } else {
    name = 'Guest';
  }
  return name;
}


/**
 * Searches and counts all tasks with the prio-value 'urgent'.
 */
function searchUrgentTasks() {
  let prio = 'urgent';
  let urgentTasks = newTaskArray.filter(function (a) {
    return a.prio === prio;
  });
  let urgentTask = urgentTasks.length;
  document.getElementById('newsNumber').innerHTML = /*html*/`
  ${urgentTask}
  `;
}


/**
 * Searches the date from the tasks.
 */
function searchDate() {
  if (newTaskArray.length == 0) {
  }
  else {
    const minDate =
      newTaskArray.map(element => {
        return element.date;
      });
    earliest = minDate.reduce(function (pre, cur) {
      return Date.parse(pre) > Date.parse(cur) ? cur : pre;
    });
    generateDate(earliest);
  }
}


/**
 * Shows current date.
 * @param {Number} earliest - date.
 */
function generateDate(earliest) {
  document.getElementById('insertDate').innerHTML = /*html*/`
   ${earliest}
    `
}


/**
 * Calculates the amount of tasks and renders the Template on the summary screen.
 */
function loadTaskStat() {
  let stat = '';
  for (let i = 0; i < newTaskArray.length; i++) {
    const element = newTaskArray[i];
    stat = newTaskArray[i]['stat'];
    let taskStat = newTaskArray.filter(function (a) {
      return a.stat === stat;
    });
    taskStats = taskStat.length;
    document.getElementById(stat).innerHTML = `    
    ${taskStats}`
  }
}


/**
 * Renders the headline on the summary screen.
 * @returns {HTMLElement} - summary screen Headline
 */
function getSummaryHeadlineDiv() {
  return /*html*/`   
          <h1 id="summaryHeadline" class="summaryHeadline">Summary</h1>
          <p id="nutshelltext" class="nutshelltext">Everything in a nutshell!</p>
  `
}


/**
 * Renders the main content on the summary screen.
 * @returns {HTMLElement} - summary screen main content.
 */
function getSummaryinnerContent() {
  return /*html*/`
  <div id="innerContentSummary" class="innerContentSummary">
    <div id="taskSection" class="d-flex taskSection">
      <div id="inBoardDiv" class="taskbox" onclick="renderBoard()">
        <div id="inBoard" class="tasknumber">${newTaskArray.length}</div>
        <p class="tasktext">Tasks in Board</p>
      </div>
      <div id="inProgressDiv" class="taskbox" onclick="renderBoard()">
        <div id="inProgress" class="tasknumber">0</div>
        <p class="tasktext">Tasks in Progress</p>
      </div>
      <div id="awaitingFeedbackDiv" class="taskbox" onclick="renderBoard()">
        <div id="awaitingFeedback" class="tasknumber">0</div>
        <p class="tasktext">Awaiting Feedback</p>
      </div>
    </div>
    <div id="newsAndDateDiv" class="newsAndDate pointer" onclick="renderBoard()">
      <div id="news" class="news">
        <img src="./img/urgent.png" alt="" />
        <div id="newsNumberAndText">
          <b id="newsNumber" class="newsNumber">0</b><br />
          Urgent
        </div>
      </div>
      <div id="dateDiv" class="date">
        <b id="insertDate" class="insertDate">0</b> <br />
        Upcoming Deadline
      </div>
    </div>
    <div id="personalTasks" class="personalTasks d-flex">
      <div id="todoDiv" class="personalTaskBox toDobg pointer" onclick="renderBoard()">
        <div id="toDoNumberAndText" class="marginLeft25">
          <b id="todo" class="toDoNumber">0</b><br />
          To Do
        </div>
      </div>
      <div id="doneDiv" class="personalTaskBox donebg pointer" onclick="renderBoard()">
        <div id="doneNumberAndText" class="marginLeft25">
          <b id="done" class="doneNumber">0</b><br />
          Done
        </div>
      </div>
    </div>
  </div>
  `
}


/**
 * Renders the login bar.
 * @returns {HTMLElement} - login bar.
 */
function getSummarySection() {
  return /*html*/`
      <div id="summarySection" class="summarySection">
        <div id="headlineDiv" class="d-flex headlineDiv">
        <div id= "managementText" class="managementText">Kanban Project Management Tool</div>
        </div>
        <div id="contentAndGreeting" class="d-flex contentAndGreeting ">
        </div>
      </div>
  `;
}


/**
 * Renders the greetings-Template on the summary screen after log in.
 * @returns {HTMLElement} - summary screen greeting.
 */
function getSummaryGreeting(currentUser) {
  return /*html*/`
              <div id="greeting" class="d-flex center greeting">
              <p class="goodMorning">Good Morning <br><b class="blueText">${currentUser}!<b></p>
            </div>
    `
}