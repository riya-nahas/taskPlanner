class TaskManager {
  constructor(currentId = 1) {
    this.currentId = currentId;
    this.tasks = [];
    this.DOMrender = false;
  }
  addTask(
    taskName,
    taskDescription,
    taskAssign,
    dueDate,
    taskPriority,
    taskStatus
  ) {
    const task = {
      id: this.currentId++,
      taskName: taskName,
      taskDescription: taskDescription,
      taskAssign: taskAssign,
      dueDate: dueDate,
      taskPriority: taskPriority,
      taskStatus: taskStatus,
      DOMrender: this.DOMrender,
    };
    this.tasks.push(task);
    // console.log(task);
    this.render(task);
    this.updateCache();
  }

  // Render the tasks
  render(task) {
    // console.log("Rendering: ", task);
    let oneTask = document.createElement("div");
    if (task.DOMrender === false) {
      oneTask.innerHTML = createCard(task);
      document.body.appendChild(oneTask);
      // console.log(task);
      task.DOMrender = !task.DOMrender;

      // To delete Task Card from DOM
      this.deleteTask(task.id);

      // Sort into columns
      this.getTasksWithStatus(task, oneTask);

      // Completed Tasks
      this.completedTasks(task, oneTask);

      this.updateCache();
    }
  }

  // Get All Tasks
  getTask() {
    const getAllTasks = this.tasks;
    return getAllTasks;
  }

  // Get Tasks By Status
  getTasksWithStatus(task, oneTask) {
    const statusValue = task.taskStatus;
    for (let i = 0; i < this.tasks.length; i++) {
      if (statusValue === "toDo") {
        document.querySelector("#toDoList").appendChild(oneTask);
      } else if (statusValue === "inProgress") {
        document.querySelector("#inProgress").appendChild(oneTask);
      } else if (statusValue === "review") {
        document.querySelector("#review").appendChild(oneTask);
      } else if (statusValue === "complete") {
        document.querySelector("#completed").appendChild(oneTask);
        document
          .querySelector(`#taskDoneBtn${task.id}`)
          .setAttribute("hidden", "");
      }
      this.updateCache();
    }
  }

  // Completed Tasks
  completedTasks(task, oneTask) {
    document
      .querySelector(`#taskDoneBtn${task.id}`)
      .addEventListener("click", () => {
        task.taskStatus = "complete";
        document.querySelector("#completed").appendChild(oneTask);
        document
          .querySelector(`#taskDoneBtn${task.id}`)
          .setAttribute("hidden", "");
        this.updateCache();
      });
  }

  //Delete Task!
  deleteTask(id) {
    // console.log(id);
    document
      .querySelector(`#taskDeleteBtn${id}`)
      .addEventListener("click", () => {
        for (let i = 0; i < this.tasks.length; i++) {
          if (this.tasks[i].id === id) {
            this.tasks.splice(i, 1);
            this.updateCache();
          }
        }
        document.querySelector(`#card${id}`).remove();
      });
  }

  // Update localStorage with current array of tasks
  updateCache() {
    localStorage.setItem("storedTasks", JSON.stringify(this.tasks));
  }

  getCache() {
    const tasksInStorage = localStorage.getItem("storedTasks");
    if (tasksInStorage) {
      const myTask = JSON.parse(tasksInStorage);
      myTask.forEach((task) => {
        this.addTask(
          task.taskName,
          task.taskDescription,
          task.taskAssign,
          task.dueDate,
          task.taskPriority,
          task.taskStatus
        );
      });
    }
  }
}

function createCard(task) {
  const oneCard = `
            <div class="oneTask" id="card${task.id}">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">${task.taskName}</h5>
                    <p class="card-text"> ${task.taskDescription}</p>
                    <p class="card-text"><b>Assigned to:</b> ${task.taskAssign}</p>
                    <h6 class="card-subtitle mb-2 text-muted"><b>Due Date:</b> ${task.dueDate}</h6>
                    <p class="card-text"><b>Priority:</b> ${task.taskPriority}</p>
                    <button type="button submit" class="btn btn-danger removeMe" id="taskDeleteBtn${task.id}"> Delete </button>
                    <button type="button submit" class="btn btn-success " id="taskDoneBtn${task.id}"> Done </button>
                  </div>
                </div>
              </div>
            </div>
          `;
  return oneCard;
}
