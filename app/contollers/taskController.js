const taskService = require("../services/taskService");
// Import Cloudinary
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with your API credentials
cloudinary.config({
  cloud_name: "djdkvlqkv",
  api_key: "782954737367348",
  api_secret: "zYihmdPIDw2kuXss74uvkxUskX4",
});

// add new task methods
const addNewTask = async (req, res) => {
  try {
    const { body } = req;
    const { user_id } = req.auth;

    body.user_id = user_id;

    const imageFile = req.files && req.files.image;

    console.log(imageFile);

    // Check if an image was uploaded
    if (!imageFile) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(imageFile, {
      folder: "tasks",
    });

    // Add image URL to task data
    body.image = result.secure_url;

    const newTask = await taskService.addTask(body);
    res.status(201).json({
      message: "Task added successfully",
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Fetch all the tasks
const fetchAllTasks = async (req, res) => {
  try {
    const allTasks = await taskService.fetchAllTask();
    res.status(200).json({
      message: "Fetched All Tasks Successfully",
      tasks: allTasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//// Edit a task
const editTask = async (req, res) => {
  const { taskId } = req.params;
  const { body } = req;
  try {
    const editedTask = await taskService.editTask(taskId, body);
    res.status(200).json(editedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  fetch single task
const getSingleTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const singleTask = await taskService.getSingleTask(taskId);
    res.status(200).json(singleTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch user tasks
const fetchUserTasks = async (req, res) => {
  try {
    const { user_id } = req.auth;
    const userTasks = await taskService.fetchUsersTask(user_id);
    res.status(200).json({
      message: "Fetched User Tasks Successfully",
      tasks: userTasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    await taskService.deleteTask(taskId);
    res.status(204).json({
      message: "Deleted Task Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addNewTask,
  deleteTask,
  fetchUserTasks,
  editTask,
  fetchAllTasks,
  getSingleTask,
};
