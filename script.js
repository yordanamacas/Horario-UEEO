// Reloj digital y fecha
function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString();
    
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    document.getElementById('date-display').textContent = now.toLocaleDateString('es-ES', options);
}
setInterval(updateClock, 1000);
updateClock();

// Auto-guardado de notas
const notesArea = document.getElementById('notes-area');
notesArea.value = localStorage.getItem('userNotes') || "";
notesArea.addEventListener('input', () => {
    localStorage.setItem('userNotes', notesArea.value);
});

// Lógica de Tareas con persistencia
let tasks = JSON.parse(localStorage.getItem('userTasks')) || [];

function showModal() { document.getElementById('modal').style.display = 'flex'; }
function hideModal() { document.getElementById('modal').style.display = 'none'; }

function addTask() {
    const name = document.getElementById('task-name').value;
    const time = document.getElementById('task-time').value;
    const day = document.getElementById('task-day').value;

    if(name && time) {
        tasks.push({ name, time, day });
        localStorage.setItem('userTasks', JSON.stringify(tasks));
        renderTasks();
        hideModal();
        document.getElementById('task-name').value = "";
    } else {
        alert("Por favor completa los campos");
    }
}

function renderTasks() {
    // Limpiar contenedores
    document.querySelectorAll('.tasks').forEach(div => div.innerHTML = "");
    
    tasks.forEach((task, index) => {
        const dayDiv = document.getElementById(task.day)?.querySelector('.tasks');
        if(dayDiv) {
            dayDiv.innerHTML += `
                <div class="task-item">
                    <span><strong>${task.time}</strong> - ${task.name}</span>
                    <button onclick="deleteTask(${index})" style="border:none; background:none; color:red; cursor:pointer;">✕</button>
                </div>
            `;
        }
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('userTasks', JSON.stringify(tasks));
    renderTasks();
}

// Cargar al iniciar
renderTasks();
