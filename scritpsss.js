<-------------- index ------------>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>


  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
    integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="stylesheet" href="style.css">
</head>

<body>

  <div class="wrapper">

    <div class="container">
      <!-- header row -->
      <div class="row p-5">
        <div class="col text-center">
          <h1> NOT TO DO LIST</h1>
        </div>
      </div>

      <!-- add task form row -->
      <div class="row p-5 border rounded shadow-lg">
        <div class="col-7">
          <input type="text" class="form-control" id="task" placeholder="ADD YOUR TASK">
        </div>
        <div class="col-2">
          <input type="number" class="form-control" id="hour" placeholder="Hours">
        </div>
        <div class="col-3 d-grid">
          <button type="button" class="btn btn-primary" id="addTask" onclick="addTask()">ADD TASK</button>

        </div>
      </div>

      <!-- task list row -->
      <div class="row mt-5 gap-2">
        <div class="col">
          <div class="row">
            <div class="col text-center">
              <h1>Entry List</h1>
              <hr />
            </div>
          </div>

          <div class="row">
            <table class="table border table-hover text-center">
              <tbody id="entry-list">
              </tbody>
            </table>
          </div>
        </div>
        <div class="col">
          <div class="row">
            <div class="col text-center">
              <h1>Bad List</h1>
              <hr />
            </div>
          </div>
          <div class="row">
            <table class="table border table-hover text-center">
              <tbody id="bad-list">
              </tbody>
            </table>
          </div>

          <div class="row">
            <div class="alert alert-danger" role="alert">
              You could have saved <span id="badHour">0</span> hours
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="alert alert-success" role="alert">
            Total Hours Allocated = <span id="totalHours">0</span> hours
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <img src=".." class="rounded me-2" alt="...">
        <strong class="me-auto">TASK</strong>

        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        TASK ADDED
      </div>
    </div>
  </div>

</body>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

<script src="script.js"></script>

</html>

<-------------- script ----------->
const WEEKLY_ALLOCATION = 24 * 7;

// generate unique string
const randomIdGenerator = () => {
  let randomStringLength = 10;
  let randomString = "";
  let alphabetString =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < randomStringLength; i++) {
    let randomIndex = Math.floor(Math.random() * alphabetString.length);
    randomString += alphabetString[randomIndex];
  }

  return randomString;
};

let taskList = [
  {
    id: "OQaCmVDVB3",
    task: "task1",
    hour: 10,
    type: "entry",
  },
  {
    id: "29JR1fr3iX",
    task: "task2",
    hour: 20,
    type: "entry",
  },
  {
    id: "d1mQJzpGgE",
    task: "task3",
    hour: 30,
    type: "entry",
  },
];

// INPUT TASK AND HOUR
// ADD the TASK to task list
const addTask = () => {
  // console.log("ADD TASK CALLED");

  const taskField = document.getElementById("task");
  const hourField = document.getElementById("hour");

  if (taskField.value != "" && hourField.value != "") {
    const taskObject = {
      id: randomIdGenerator(),
      task: taskField.value,
      hour: parseInt(hourField.value),
      type: "entry",
    };

    if (taskObject.hour + calculateTotalhour() <= WEEKLY_ALLOCATION) {
      taskList.push(taskObject);
      displayTask();
      const toastLiveExample = document.getElementById("liveToast");

      const toastBootstrap =
        bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      toastBootstrap.show();
    } else {
      alert("TASK HOUR ALLOCATION EXCEEDED");
    }
  } else {
    alert("Please enter task or hour!!");
  }

  // console.log(taskList);
};

// displaying entry list and bad list
const displayTask = () => {
  const goodListElement = document.getElementById("entry-list");
  const badListElement = document.getElementById("bad-list");

  goodListElement.innerHTML = "";
  badListElement.innerHTML = "";

  taskList.map((item, index) => {
    let goodTrValue = "";
    let badTrValue = "";
    if (item.type == "entry") {
      goodTrValue = `
                  <tr class='task-row'>
                    <td>${index + 1} <input type='checkbox' /></td>
                    <td>${item.task}</td>
                    <td>${item.hour}</td>
                    <td class="text-end "><button class="btn btn-danger me-1" onclick="deleteTask('${
                      item.id
                    }')"><i
                          class="fa-solid fa-trash"></i></button>
                          <button class="btn btn-success" onclick="convertTask('${
                            item.id
                          }')"><i
                          class="fa-solid fa-arrow-right"></i></button></td>
                  </tr>
      `;
    } else {
      badTrValue = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.task}</td>
                    <td>${item.hour}</td>
                  <td class="text-end "> <button class="btn btn-warning" onclick="convertTask('${
                    item.id
                  }')"><i
                        class="fa-solid fa-arrow-left"></i></button>
                        <button class="btn btn-danger ms-1" onclick="deleteTask('${
                          item.id
                        }')"><i
                        class="fa-solid fa-trash"></i></button></td>
                </tr>`;
    }

    goodListElement.innerHTML = goodListElement.innerHTML + goodTrValue;
    badListElement.innerHTML = badListElement.innerHTML + badTrValue;
  });

  // display total hour
  const totalHourSpan = document.getElementById("totalHours");
  totalHourSpan.innerText = calculateTotalhour();

  // display bad hour
  const badHourSpan = document.getElementById("badHour");
  badHourSpan.innerText = calculateBadHours();
};

// change type from entry -> bad or bad -> entry
const convertTask = (id) => {
  console.log("TASK CONVERTED");

  let task = taskList.find((task) => task.id == id);

  task.type = task.type == "entry" ? "bad" : "entry";

  displayTask();
};

// Delete Task
const deleteTask = (id) => {
  console.log("ID TO DELETE:", id);

  if (confirm("Deleting Task....\n Are you Sure ?")) {
    taskList = taskList.filter((task) => task.id !== id);

    displayTask();
  }
};

const calculateTotalhour = () => {
  let totalHour = taskList.reduce((acc, item) => acc + item.hour, 0);

  return totalHour;
};

const calculateBadHours = () => {
  // let badHour = taskList.reduce((acc, item) => {
  //   return acc + (item.type == "bad" ? item.hour : 0);
  // }, 0);

  let badHour = taskList.reduce((acc, task) => {
    if (task.type == "bad") {
      return acc + task.hour;0
    } else {
      return acc;
    }
  }, 0);

  return badHour;
};

displayTask();

displayTask();
