const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 4000;
const tasksRouter = require('./routes/taskRoutes');
app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});