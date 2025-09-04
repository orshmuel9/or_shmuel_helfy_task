const express = require('express');
const router = express.Router();

// In-memory task storage
let tasks = [
    {
        id: 1,
        title: 'hello',
        description: 'world',
        completed: false,
        createdAt: new Date(),
        priority: 'medium'
    },
    {
        id: 2,
        title: 'hello2',
        description: 'world2',
        completed: false,
        createdAt: new Date(),
        priority: 'high'
    }
];


// Get all tasks
router.get('/', (req, res) => {
    res.json(tasks);
});

// Create a new task
router.post('/', (req, res) => {
    const { title, description, priority } = req.body;
    if (!title || !description || !priority) {
        return res.status(400).json({ error: 'Title, description, and priority are required' });
    }
    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        completed: false,
        createdAt: new Date(),
        priority
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update a task
router.put('/:id', (req, res) => {
    const taskId = paraseInt(req.params.id);
    const { title, description, completed, priority } = req.body;

    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    task.title = title !== undefined ? title : task.title;
    task.description = description !== undefined ? description : task.description;
    task.completed = completed !== undefined ? completed : task.completed;
    task.priority = priority !== undefined ? priority : task.priority;

    res.json(task);
});

// Delete a task
router.delete('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    res.status(204).end();
});


// toggle task completion
router.patch('/:id/toggle', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    task.completed = !task.completed;
    res.json(task);
});