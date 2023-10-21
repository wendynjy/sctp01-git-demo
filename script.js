document.addEventListener("DOMContentLoaded", async function(){
    
    async function main(){

        let todos = await loadTask();
        // addTodo(todos, "Walk the dog", 5);
        // addTodo(todos, "Clean the house", 3);
        // addTodo(todos, "Buy grocery", 3);
        renderTodos(todos);

        // attach all the event listeners
        document.querySelector("#addTodo")
            .addEventListener('click', function(){
                const taskNameElement = document.querySelector("#taskName");
                const taskName = taskNameElement.value;

                const taskUrgencyElement = document.querySelector("#taskUrgency");
                const taskUrgency = taskUrgencyElement.value;

                const taskAssignElement = document.querySelector("#taskAssign");
                const taskAssign = taskAssignElement.value;

                addTodo(todos, taskName, taskUrgency, taskAssign);
                renderTodos(todos); // redraw the list of tasks
            })
        
    }

    function renderTodos(todos) {
        const todoListElement = document.querySelector("#todoList tbody");
        todoListElement.innerHTML = ""; // Clear existing content

        // Loop through the todos array and create table rows
        for (let i = 0; i < todos.length; i++) {
            const todo = todos[i];
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${i + 1}</td>
                <td>${todo.name}</td>
                <td>${todo.urgency}</td>
                <td>${todo.assign}</td>
                <td>
                    <button class="btn btn-primary btn-sm edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm delete-btn"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;
                // Set the class for the table row
                row.className = "table table-hover-item";
        
                // Add event listeners to the edit and delete buttons for this row
                const editButton = row.querySelector(".edit-btn");
                editButton.addEventListener("click", () => {
                    const newTaskName = prompt("Please enter the new task name:", todo.name);
                    const newTaskUrgency = prompt("Please enter the new task urgency:", todo.urgency);
                    const newTaskAssign = prompt("Who are you assigning the task to:", todo.assign);
                    modifyTask(todos, todo.id, newTaskName, newTaskUrgency, newTaskAssign);
                    renderTodos(todos);
                });
        
                const deleteButton = row.querySelector(".delete-btn");
                deleteButton.addEventListener("click", () => {
                    deleteTask(todos, todo.id);
                    renderTodos(todos);
                });
            todoListElement.appendChild(row);
        }
    }

    main();
})