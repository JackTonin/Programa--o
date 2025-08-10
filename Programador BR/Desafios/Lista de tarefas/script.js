
let input = document.getElementById("taskInput");
let addButton = document.getElementById("addTaskButton");
let taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

taskRender();

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
        addLocalStorage();
        taskRender();
    }
});
addButton.addEventListener('click', () => {
    addTask();
    addLocalStorage();
    taskRender();
});
taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('removeButton')) {
        const index = event.target.getAttribute('data-index');
        removeTask(index);
    }
    taskList.addEventListener("change", (e) => {
        if (e.target.classList.contains("checkbox")) {
            const taskText = e.target.nextElementSibling;
            taskText.classList.toggle("completed", e.target.checked);
        }
        else {

        }
    });

});
function addTask() {
    if (input.value.trim() === '') {
        alert("Digite uma tarefa");
        return;
    }
    else {
        tasks.push(input.value.trim());
        input.value = '';
    }
}
function taskRender() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" class="checkbox">
            <span class="taskText">${task}</span>
            <button class="removeButton" data-index="${index}">X</button>`;;
        taskList.appendChild(li);
    })
    if (tasks.length === 0) {
        let deleteHint = document.getElementById("deleteHint");
        deleteHint.style.display = "none";
    }
    else {
        let deleteHint = document.getElementById("deleteHint");
        deleteHint.style.display = "flex";
    }
}

function addLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(index) {
    tasks.splice(index, 1);
    addLocalStorage();
    taskRender();
}