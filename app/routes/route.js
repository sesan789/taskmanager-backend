const express = require("express");
const router = express.Router();

// importing of controllers
const authController = require("../contollers/authController");
const { authChecker, upload } = require("../middlewares/authMiddleware");
const userController = require("../contollers/userController");
const taskController = require("../contollers/taskController");
const orderController = require("../contollers/orderController");

/**
 *
 * UNAUTHENTICATED ROUTES
 *
 */

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.get("/tasks/all", taskController.fetchAllTasks);
router.get("/tasks/get/:taskId", taskController.getSingleTask);

/**
 *
 * AUTHENTICATED ROUTES
 *
 */
router.use(authChecker);

// route to fetch user data
router.get("/getProfile", userController.getUserProfile);

// route to update user data
router.put("/updateProfile", userController.updateUserProfile);

/**
 *
 * TASK ROUTES
 */
router.get("/tasks", taskController.fetchUserTasks);
router.post("/tasks/add", upload.single("image"), taskController.addNewTask);
router.put("/tasks/edit/:taskId", taskController.editTask);
router.delete("/tasks/delete/:taskId", taskController.deleteTask);

/**
 *
 * ORDER ROUTES
 */
router.post("/make-order", orderController.addNewOrder);

module.exports = router;
