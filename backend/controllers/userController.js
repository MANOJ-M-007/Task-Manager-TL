const asyncHandler = require('express-async-handler')
const bcrypt = require("bcryptjs");
const generateToken = require('../util/generateTocken')
const { Users } = require('../models')
const { Tasks } = require('../models')
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    console.log(name, email, mobile, password);
    const userExists = await Users.findOne({ where: { email } });
    if (userExists) {
      res.json({
        message: "User Already exists",
      });
    } else {
      const salt = await bcrypt.genSaltSync(10);
      let hashPassword = await bcrypt.hash(password, salt);
      if (hashPassword) {
        const newUser = await Users.create({
          name,
          email,
          mobile,
          password: hashPassword,
        });
        if (newUser) {
          console.log(newUser.dataValues.id);
          res.json({
            name: name,
            email: email,
            mobile: mobile,
            token: generateToken(newUser.dataValues.id),
          });
        }
      }
    }
  } catch (error) {
    console.log("trycatch error :", error.message);
  }
})

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.dataValues.password))) {
      res.json({
        name: user.dataValues.name,
        email: user.dataValues.email,
        token: generateToken(user.dataValues.id),
      });
    } else {
      if (!user) {
        res.status(400)
      throw new Error('User Does Not Exists!')
      }
      res.json({
        message: "Password Incorrect!!!",
      });
    }
  } catch (error) {
    console.log("trycatch error :", error.message);
  }
})

const addTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, startDate, endDate } = req.body;

    const task = await Tasks.create({
      title,
      description,
      startDate,
      endDate,
      progress: 0,
      status: false,
      userId
    });
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const listTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const tasks = await Tasks.findAll({
      where: { userId },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId'],
      },
    });
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Tasks.findByPk(id);
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }
    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const updateTask = asyncHandler(async (req, res) => {
  try {
    const { id, title, description, startDate, endDate, progress } = req.body;
    console.log(title, description, startDate, endDate, progress);

    const task = await Tasks.findByPk(id);
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }
    task.title = title;
    task.description = description;
    task.startDate = startDate;
    task.endDate = endDate;
    task.progress = progress;
    if (progress === 100) {
      task.status = true;
    }
    await task.save();
    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});


const setRemainder = asyncHandler(async (req, res) => {
  try {
    const taskId = req.params.id;
    const value1 = req.body;
    const userId = req.user.id;

    const task = await Tasks.findOne({
      where: {
        id: taskId,
        userId: userId,
      },
    });
    console.log(task);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    else {
      task.remainder = value1.valueDate
    }
    const updated = await task.save();
    const updatask = await Tasks.findOne({ _id: taskId, userId });
    console.log(updatask);
    res
      .status(200)
      .json({ message: "Task updated successfully", task: updated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});



module.exports = {
  registerUser,
  login,
  addTasks,
  listTasks,
  deleteTask,
  updateTask,
  setRemainder
}