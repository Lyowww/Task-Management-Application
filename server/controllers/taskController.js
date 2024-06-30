const User = require('../../database/model/user.model');
const Task = require('../../database/model/task.model');

const addTask = async (req, res) => {
    const { task, id } = req.body;
    try {
        if (!task) return res.status(400).send('Please enter the task');
        if (task.length < 10) return res.status(400).send('Add minimum 10 characters');
        
        const taskDetail = new Task({
            task,
            createdBy: id,
        });
        await taskDetail.save();
        return res.status(201).json(taskDetail);
    } catch (error) {
        return res.status(500).send('Task addition failed');
    }
};

const getAllTasks = async (req, res) => {
    const { id } = req.query; 

    try {
        const tasklist = await Task.find({ createdBy: id });
        return res.status(200).send(tasklist);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const editTask = async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;

    try {
        if (!task) return res.status(400).send('Please enter the task');
        if (task.length < 10) return res.status(400).send('Add a minimum of 10 characters');
        
        const updatedTask = await Task.findByIdAndUpdate(id, { task }, { new: true });
        if (!updatedTask) return res.status(404).send('Task not found');

        return res.status(200).send(updatedTask);
    } catch (error) {
        return res.status(500).send('Task update failed');
    }
};

const statusChange = async (req, res) => {
    const { id, string } = req.body;

    try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).send('Task not found');

        const statusOrder = ['backlog', 'todo', 'doing', 'done'];

        if (string === 'right') {
            const currentIndex = statusOrder.indexOf(task.status);
            if (currentIndex < statusOrder.length - 1) {
                task.status = statusOrder[currentIndex + 1];
            }
        } else {
            const currentIndex = statusOrder.indexOf(task.status);
            if (currentIndex > 0) {
                task.status = statusOrder[currentIndex - 1];
            }
        }

        await task.save();
        return res.status(200).send(task);
    } catch (error) {
        return res.status(500).send('Status change failed');
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Task.findByIdAndDelete(id);
        if (!response) return res.status(404).send('Task not found');
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send('Delete failed');
    }
};

module.exports = {
    addTask,
    getAllTasks,
    editTask,
    statusChange,
    deleteTask,
};
