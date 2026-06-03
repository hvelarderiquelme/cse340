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
  processAssignCategoriesForm,
  showNewCategoryForm,
  processNewCategoryForm,
  categoryValidation,
  showEditCategoryForm,
  processEditCategoryForm
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

import {
  showUserRegistrationForm,
  processUserRegistrationForm,
  userValidation,
  showLoginForm,
  processLoginForm,
  processLogout
} from './controllers/users.js';

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
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
//Route to process assign categories form
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
//Route to show project info form
router.get('/edit-project/:projectId', showEditProjectForm);
//Route to process the project form
router.post('/edit-project/:projectId', projectValidation, processEditProjectForm);
//Route to open New category Page 
router.get('/new-category', showNewCategoryForm);
//Route to process the new categoty
router.post('/new-category', categoryValidation, processNewCategoryForm);
//Route for showing edit category form
router.get('/edit-category/:categoryId', showEditCategoryForm);
//Route to process the update category form
router.post('/edit-category/:categoryId', categoryValidation, processEditCategoryForm);
//Route to show registration form
router.get('/register', showUserRegistrationForm);
//Route to process the user registration form
router.post('/register', userValidation, processUserRegistrationForm);
/***************login routes*****************/
//router for showLoginForm
router.get('/login',showLoginForm);
//router for processLoginForm
router.post('/login', processLoginForm);
//router for logout
router.get('/logout', processLogout);

export default router;