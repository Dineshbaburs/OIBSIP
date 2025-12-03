let tasks = [];

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if (!text) return;

    const task = {
        id: Date.now(),
        text,
        completed: false
    };

    tasks.push(task);
    input.value = "";
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

function editTask(id) {
    const updated = prompt("Edit task:");
    if (!updated) return;

    tasks = tasks.map(t =>
        t.id === id ? { ...t, text: updated } : t
    );

    renderTasks();
}

function toggleComplete(id) {
    tasks = tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
    );
    renderTasks();
}

function showTab(type) {
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
    event.target.classList.add("active");

    renderTasks(type);
}

function renderTasks(filter = "all") {
    const list = document.getElementById("taskList");
    const emptyMessage = document.getElementById("emptyMessage");

    list.innerHTML = "";

    let filtered = tasks;
    if (filter === "pending") filtered = tasks.filter(t => !t.completed);
    if (filter === "completed") filtered = tasks.filter(t => t.completed);

    filtered.forEach(task => {
        const li = document.createElement("li");
        li.className = "task" + (task.completed ? " completed" : "");
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="actions">
                <button class="editBtn" onclick="editTask(${task.id})">Edit</button>
                <button class="deleteBtn" onclick="deleteTask(${task.id})">Delete</button>
                <button class="completeBtn" onclick="toggleComplete(${task.id})">
                    ${task.completed ? "Undo" : "Done"}
                </button>
            </div>
        `;
        list.appendChild(li);
    });

    emptyMessage.style.display = filtered.length ? "none" : "block";

    document.getElementById("pendingCount").textContent = tasks.filter(t => !t.completed).length;
    document.getElementById("completedCount").textContent = tasks.filter(t => t.completed).length;
    document.getElementById("totalCount").textContent = tasks.length;
}
