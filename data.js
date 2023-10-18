let todos = [];

function addTodo(todos, name, urgency, assign) {
  let newTodo = {
    id: Math.floor(Math.random() * 100 + 1),
    name: name,
    urgency: urgency,
    assign: assign
  };
  todos.push(newTodo);
}

function modifyTask(todos, id, newTaskName, newUrgency, newAssign) {
  let task = null;
  for (let t of todos) {
    if (t.id == id) {
      task = t;
    }
  }
  if (task) {
    task.name = newTaskName;
    task.urgency = newUrgency;
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