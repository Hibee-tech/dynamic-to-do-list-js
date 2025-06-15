// document.addEventListener('DOMContentLoaded', () => {
//     const addButton = document.getElementById('add-task-btn');
//     const taskInput = document.getElementById('task-input');
//     const taskList = document.getElementById('task-list');

//     function addTask() {
//         const taskText = taskInput.value.trim();

//         if (taskText === '') {
//             alert('Please enter a task.');
//             return;
//         }

//         const li = document.createElement('li');
//         li.textContent = taskText;

//         const removeBtn = document.createElement('button');
//         removeBtn.textContent = 'Remove';

//         // Use classList.add instead of className =
//         removeBtn.classList.add('remove-btn');

//         // Remove task on button click
//         removeBtn.onclick = () => {
//             taskList.removeChild(li);
//         };

//         li.appendChild(removeBtn);
//         taskList.appendChild(li);

//         taskInput.value = '';
//     }

//     addButton.addEventListener('click', addTask);

//     taskInput.addEventListener('keypress', (event) => {
//         if (event.key === 'Enter') {
//             addTask();
//         }
//     });
// });
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false to avoid re-saving to localStorage
    }

    // Add task to DOM and optionally save to localStorage
    function addTask(taskText, save = true) {
        if (typeof taskText !== 'string' || taskText.trim() === '') {
            if (save) alert('Please enter a task.');
            return;
        }

        const trimmedTask = taskText.trim();

        // Create task list item
        const li = document.createElement('li');
        li.textContent = trimmedTask;

        // Create Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Remove task and update localStorage on button click
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            updateLocalStorage();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            updateLocalStorage();
            taskInput.value = ''; // clear input only when manually added
        }
    }

    // Save current tasks in DOM to localStorage
    function updateLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            // li.textContent includes 'Remove', so remove the button text
            const taskText = li.firstChild.textContent || li.textContent;
            tasks.push(taskText.trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addButton.addEventListener('click', () => addTask(taskInput.value));
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    loadTasks();
});
