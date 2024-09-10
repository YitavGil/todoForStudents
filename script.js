let todos = JSON.parse(localStorage.getItem('todos')) || [];

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function renderTodos(filteredTodos = todos) {
    const tbody = document.querySelector('#todoTable tbody');
    tbody.innerHTML = '';
    filteredTodos.forEach(todo => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${todo.id.substr(0, 3)}...</td>
            <td class="${todo.isDone ? 'done' : ''}">${todo.text}</td>
            <td>${todo.isDone ? 'כן' : 'לא'}</td>
            <td>
                <button onclick="toggleDone('${todo.id}')" style="background-color: ${todo.isDone ? '#4CAF50' : '#FF9800'}">
                    ${todo.isDone ? 'בטל סיום' : 'סמן כהושלם'}
                </button>
                <button onclick="editTodo('${todo.id}')" style="background-color: #2196F3">ערוך</button>
                <button onclick="deleteTodo('${todo.id}')" style="background-color: #f44336">מחק</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function addTodo(event) {
    event.preventDefault();
    const input = document.getElementById('todoInput');
    const todo = {
        id: generateId(),
        text: input.value,
        isDone: false
    };
    todos.push(todo);
    saveTodos();
    renderTodos();
    input.value = '';
}

function toggleDone(id) {
    const todo = todos.find(t => t.id === id);
    todo.isDone = !todo.isDone;
    saveTodos();
    renderTodos();
}

function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    const editInput = document.getElementById('editInput');
    editInput.value = todo.text;
    document.getElementById('editPopup').style.display = 'block';
    
    document.getElementById('saveEdit').onclick = function() {
        todo.text = editInput.value;
        saveTodos();
        renderTodos();
        document.getElementById('editPopup').style.display = 'none';
    };
    
    document.getElementById('cancelEdit').onclick = function() {
        document.getElementById('editPopup').style.display = 'none';
    };
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

document.getElementById('todoForm').addEventListener('submit', addTodo);

document.getElementById('filterButton').addEventListener('click', function() {
    const filteredTodos = todos.filter(todo => todo.isDone);
    renderTodos(filteredTodos);
});

renderTodos();