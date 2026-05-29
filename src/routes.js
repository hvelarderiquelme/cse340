import express from 'express';

import { homePage } from './controllers/index.js';
import { testErrorPage } from './controllers/errors.js';

import {
  projectsPage,
  upcomingProjectsPage,
  showProjectDetailsPage,
  createProject,
  showNewProjectForm,
  processNewProjectForm,
  projectValidation,
  showEditProjectForm,
  processEditProjectForm
} from './controllers/projects.js';

import {
  categoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm
} from './controllers/categories.js';

import {
  organizationsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  organizationValidation,
  showOrganizationDetailsPage,
  showEditOrganizationForm,
  processEditOrganizationForm
} from './controllers/organizations.js';


const router = express.Router();

/**
  * Routes
  */
router.get('/', homePage);
router.get('/organizations', organizationsPage);
//router.get('/projects', projectsPage);
router.get('/projects', upcomingProjectsPage);
router.get('/categories', categoriesPage);
// Test route for 500 errors
router.get('/test-error', testErrorPage);
//Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);
// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
//Route to display the edit-organization page
router.get('/edit-organization/:id', showEditOrganizationForm);
//Route to handle the edit organization for submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
//Route to display new project form
router.get('/new-project', showNewProjectForm);
//Route to process new project form
router.post('/new-project', projectValidation, processNewProjectForm);
//Route to show the categories form
//router.get('/assign-categories/:projectId', showAssignCategoriesForm);
//Route to process assign categories form
//router.post('/assign-categories/:projectId', processAssignCategoriesForm);
//Route to show project info form
//router.get('/edit-project/:projectId', showEditProjectForm);
//Route to process the project form
//router.post('/edit-project/:projectId', projectValidation, processEditProjectForm);


export default router;