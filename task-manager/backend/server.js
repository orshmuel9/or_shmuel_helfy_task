const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 4000;
const tasksRouter = require('./routes/taskRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');


app.use(cors());
app.use(express.json());

app.use(logger);
app.use('/api/tasks', tasksRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});