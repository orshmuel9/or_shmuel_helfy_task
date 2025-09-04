// task API service

const API_URL = 'http://localhost:4000/api/tasks/';

// Fetch all tasks
async function fetchTasks() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return response.json();
}

// Create a new task
async function createTask(task) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error('Failed to create task');
    }
    return response.json();
}

// Update an existing task
async function updateTask(id, updates) {
    const response = await fetch(`${API_URL}${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });
    if (!response.ok) {
        throw new Error('Failed to update task');
    }
    return response.json();
}

// Delete a task
async function deleteTask(id) {
    const response = await fetch(`${API_URL}${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete task');
    }
    return true;
}

// Toggle task completion
async function toggleTaskCompletion(id) {
    const response = await fetch(`${API_URL}${id}/toggle`, {
        method: 'PATCH',
    });
    if (!response.ok) {
        throw new Error('Failed to toggle task completion');
    }
    return response.json();
}
export { fetchTasks, createTask, updateTask, deleteTask, toggleTaskCompletion };