const tasksManager = new TaskManager();
const tasksManagerArray = tasksManager.tasks;
tasksManager.getCache();

// addTask Form
const taskName = document.querySelector("#taskName");
const taskDescription = document.querySelector("#taskText");
const taskAssign = document.querySelector("#taskAssign");
const dueDate = document.querySelector("#dueDate");
const taskPriority = document.querySelector("#taskPriority");
const taskStatus = document.querySelector("#taskStatus");
const submitTaskFormBtn = document.querySelector("#submitTaskFormBtn");
const deleteTaskFormBtn = document.querySelector("removeMe");

// Error spans
const taskNameError = document.querySelector("#taskNameError");
const taskDescriptionError = document.querySelector("#taskDescriptionError");
const taskAssignError = document.querySelector("#taskAssignError");
const dueDateError = document.querySelector("#dueDateError");

// For successful submit
const successMsg = document.querySelector("#successfulSubmitMsg");

// Due Date logic
let todayDate = new Date().getTime();

const validateTaskForm = () => {
  // Form will not submit successfully unless numberOfErrors is 0
  let numberOfErrors = 0;

  // Task Name
  if (!taskName.value) {
    taskName.classList.add("errorStyle");
    taskNameError.innerText = "Please add a task name.";
    numberOfErrors++;
  } else if (taskName.value.length < 8) {
    taskName.classList.add("errorStyle");
    taskNameError.innerText = "Task name needs to be longer than 8 characters.";
    numberOfErrors++;
  } else {
    taskName.classList.remove("errorStyle");
    taskName.classList.add("successStyle");
    taskNameError.innerText = "";
  }

  // Task Description
  if (!taskDescription.value) {
    taskDescription.classList.add("errorStyle");
    taskDescriptionError.innerText = "Please add a task description.";
    numberOfErrors++;
  } else if (taskDescription.value.length < 15) {
    taskDescription.classList.add("errorStyle");
    taskDescriptionError.innerText =
      "Task Description needs to be longer than 15 characters.";
    numberOfErrors++;
  } else {
    taskDescription.classList.remove("errorStyle");
    taskDescription.classList.add("successStyle");
    taskDescriptionError.innerText = "";
  }

  // Task Assign
  if (!taskAssign.value) {
    taskAssign.classList.add("errorStyle");
    taskAssignError.innerText = "Please assign a name.";
    numberOfErrors++;
  } else if (taskAssign.value.length < 8) {
    taskAssign.classList.add("errorStyle");
    taskAssignError.innerText = "Name needs to be longer than 8 characters.";
    numberOfErrors++;
  } else {
    taskAssign.classList.remove("errorStyle");
    taskAssign.classList.add("successStyle");
    taskAssignError.innerText = "";
  }

  // Due Date
  if (!dueDate.value) {
    dueDate.classList.add("errorStyle");
    dueDateError.innerText = "Please assign a date.";
    numberOfErrors++;
  } else if (new Date(`${dueDate.value}`).getTime() < todayDate) {
    dueDate.classList.add("errorStyle");
    dueDateError.innerText = "You cannot pick a past date.";
    numberOfErrors++;
  } else {
    dueDate.classList.remove("errorStyle");
    dueDate.classList.add("successStyle");
    dueDateError.innerText = "";
  }

  // Task Priorty(default is Low)
  if (taskPriority) {
    taskPriority.classList.add("successStyle");
  }

  // Task Status  (default is To Do )
  if (taskStatus) {
    taskStatus.classList.add("successStyle");
  }

  // If everything is successful!
  if (numberOfErrors === 0) {
    tasksManager.addTask(
      taskName.value,
      taskDescription.value,
      taskAssign.value,
      dueDate.value,
      taskPriority.value,
      taskStatus.value
    );
    // console.log(tasksManagerArray);
    // tasksManager.render();

    // Display Successful Message for 3 seconds
    successMsg.innerHTML = "Submitted Successfully";
    setTimeout(() => {
      successMsg.innerHTML = "";
    }, 3000);

    // Reset Values
    resetValues();
  }

  function resetValues() {
    // reset everything once submitted successfully
    // Values
    taskName.value = "";
    taskDescription.value = "";
    taskAssign.value = "";
    dueDate.value = "";
    taskPriority.value = "Low";
    taskStatus.value = "toDo";
    // Styles
    taskName.classList.remove("successStyle");
    taskDescription.classList.remove("successStyle");
    taskAssign.classList.remove("successStyle");
    dueDate.classList.remove("successStyle");
    taskPriority.classList.remove("successStyle");
    taskStatus.classList.remove("successStyle");
  }
};

submitTaskFormBtn.addEventListener("click", validateTaskForm);

// showCurrentTime/Date
const zeroFill = (n) => {
  return ("0" + n).slice(-2);
};

// Creates interval
const interval = setInterval(() => {
  // Get current time
  const now = new Date();

  // Format date as in dd//aaaa hh:ii:ss
  const dateTime =
    zeroFill(now.getUTCDate()) +
    "/" +
    zeroFill(now.getMonth() + 1) +
    "/" +
    now.getFullYear() +
    " " +
    zeroFill(now.getHours()) +
    ":" +
    zeroFill(now.getMinutes()) +
    ":" +
    zeroFill(now.getSeconds());

  // Display the date and time on the screen using div#date-time
  document.getElementById("date-time").innerHTML = dateTime;
}, 1000);
