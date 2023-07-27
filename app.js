const express = require('express');
const path = require('path');
const tasksRouter = require('./routes/tasks');
const connectDb = require('./db/connect');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// APIs for managing tasks
app.use('/api/v1/tasks', tasksRouter);

const PORT = process.env.PORT || 5000;

const start = async () => {
    await connectDb(process.env.MONGODB_URI);

    app.listen(PORT, () => {
        console.log(`server listening on port: ${PORT}`);
    });
}

start();
