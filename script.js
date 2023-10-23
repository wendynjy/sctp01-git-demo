document.addEventListener("DOMContentLoaded", function(){
    
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

                const taskPriorityElement = document.querySelector("#taskPriority");
                const taskPriority = taskPriorityElement.value;

                const taskAssignElement = document.querySelector("#taskAssign");
                const taskAssign = taskAssignElement.value;

                addTodo(todos, taskName, taskPriority, taskAssign);
                renderTodos(todos); // redraw the list of tasks
            })

        document.querySelector("#save-btn")
            .addEventListener("click", async function(){
                await saveTask(todos);
                 // Use SweetAlert2 with a close button
                Swal.fire({
                    icon: 'success',
                    title: 'Tasks have been saved',
                    showConfirmButton: true,
                    }).then((result) => {
                    // Check if the "OK" button was clicked
                    if (result.isConfirmed) {
                        // Refresh the page
                        window.location.reload();
                    }
               
                });
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
                <td>${todo.priority}</td>
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
                    const newTaskPriority = prompt("Please enter the new task priority:", todo.priority);
                    const newTaskAssign = prompt("Who are you assigning the task to:", todo.assign);
                    modifyTask(todos, todo.id, newTaskName, newTaskPriority, newTaskAssign);
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