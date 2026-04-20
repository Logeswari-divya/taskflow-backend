const express = require('express');
const router= express.Router();
const {auth} = require('../middleware/authmiddleware.js');
const taskRoutes = require('./taskRoutes.js');
const {role} = require("../middleware/roleMiddleware.js");
const {createProjectsCon,getProjectsCon,updateProject,deleteProject} = require('../controllers/projectController');
const projectValidation = require('../validations/projectValidation.js');
const validate = require('../middleware/validationMiddleware.js');
router.route('/').post(auth,role('admin','manager'),projectValidation,validate,createProjectsCon).get(auth,role('admin','manager','employee'),getProjectsCon);
router.route('/:id').patch(auth,role('admin','manager'),updateProject).delete(auth,role('admin','manager'),deleteProject);
router.use('/:projectId/tasks',taskRoutes);
router.use('/:projectId/projectTasks',taskRoutes);
module.exports = router;

