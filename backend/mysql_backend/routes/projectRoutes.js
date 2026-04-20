const express = require('express');
const router= express.Router();
const {auth} = require('../middleware/authmiddleware.js');
const taskRoutes = require('./taskRoutes.js');
const {createProjectsCon,getProjectsCon,updateProject,deleteProject} = require('../controllers/projectController');
const projectValidation = require('../validations/projectValidation.js');
const validate = require('../middleware/validationMiddleware.js');
router.route('/').post(auth,projectValidation,validate,createProjectsCon).get(auth,getProjectsCon);
router.route('/:id').patch(updateProject).delete(deleteProject);
router.use('/:projectId/tasks',taskRoutes);
router.use('/:projectId/projectTasks',taskRoutes);
module.exports = router;

