const Task = require('../models/task');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ err });
    }
};

const addTasks = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (err) {
        res.status(500).json({ err });
    }
};

const getSingleTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({_id: id});
        if (!task) {
            return res.status(400).json({err: 'Task not found'});
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ err });
    }
};  

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndUpdate({_id: id}, req.body, {
            new: true,
            runValidators: true
        });

        if (!task) {
            return res.status(400).json({err: 'Task not found'});
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ err });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndDelete({_id: id});
        if (!task) {
            return res.status(400).json({err: 'Task not found'});
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ err });
    }
};

module.exports = {
    getTasks, 
    addTasks,
    getSingleTask, 
    updateTask,
    deleteTask
};
