const express = require('express');
const router = express.Router({mergeParams:true});

const {auth} = require('../middleware/authmiddleware.js');
const taskController = require('../controllers/taskController.js');
const {role} = require("../middleware/roleMiddleware.js");
const commentRoutes = require('./commentRoutes.js');
const createTaskValidation = require('../validations/taskValidation.js');
const validate = require('../middleware/validationMiddleware.js');
router.route('/').post(auth,role('admin','manager','employee'),createTaskValidation,validate,taskController.createTask).get(auth,role('admin','manager','employee'),taskController.getTasks);
router.route('/:id').delete(auth,role('admin','manager','employee'),taskController.deleteTask).put(auth,role('admin','manager','employee'),taskController.updateTask);
router.route('/:id/status').patch(auth,role('admin','manager','employee'),taskController.updateTaskStatus);
router.route('/getTask').get(auth,role('admin','manager','employee'),taskController.getTaskByProjects);
router.route('/:taskId').get(auth,role('admin','manager','employee'),taskController.findTask);
router.use('/:taskId/comment',commentRoutes);
module.exports = router;