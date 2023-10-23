const BASE_JSON_BIN_URL = "https://api.jsonbin.io/v3";
const BIN_ID = "65334ea50574da7622bbaa36";
// For assessment purpose only 
const MASTER_KEY = "$2a$10$RJ1uEork7KfIInoLUpFzIuhMEwXmN8VJiX6JGeO9lLpA59P0qW0tK";


async function loadTask() {
  const response = await axios.get(`${BASE_JSON_BIN_URL}/b/${BIN_ID}/latest`);
  console.log(response);
  return response.data.record;
}

async function saveTask(todos) {
  const response = await axios.put(`${BASE_JSON_BIN_URL}/b/${BIN_ID}`, todos,{
    "content-type":"application/json",
    "X-Master-Key": MASTER_KEY
  });
  console.log(response.data);
}

function addTodo(todos, name, priority, assign) {
  let newTodo = {
    id: Math.floor(Math.random() * 100 + 1),
    name: name,
    priority: priority,
    assign: assign
  };
  todos.push(newTodo);
}

function modifyTask(todos, id, newTaskName, newPriority, newAssign) {
  let task = null;
  for (let t of todos) {
    if (t.id == id) {
      task = t;
    }
  }
  if (task) {
    task.name = newTaskName;
    task.priority = newPriority;
    task.assign = newAssign;
  } else {
    console.log("Task is not found");
  }
}

function deleteTask(todos, id) {
  let indexToDelete = null;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      indexToDelete = i;
      break;
    }
  }
  if (indexToDelete !== null) {
    todos.splice(indexToDelete, 1);
  } else {
    console.log("Task is not found");
  }
}