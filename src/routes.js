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
  processLogout,
  requiredLogin,
  showDashboard,
  requireRole
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
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
//Route to display the edit-organization page
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
//Route to handle the edit organization for submission
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);
//Route to display new project form
router.get('/new-project', requireRole('admin'), showNewProjectForm);
//Route to process new project form
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
//Route to show the categories form
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
//Route to process assign categories form
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);
//Route to show project info form
router.get('/edit-project/:projectId', requireRole('admin'), showEditProjectForm);
//Route to process the project form
router.post('/edit-project/:projectId', requireRole('admin'), projectValidation, processEditProjectForm);
//Route to open New category Page 
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
//Route to process the new categoty
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
//Route for showing edit category form
router.get('/edit-category/:categoryId', requireRole('admin'), showEditCategoryForm);
//Route to process the update category form
router.post('/edit-category/:categoryId', requireRole('admin'), categoryValidation, processEditCategoryForm);
//Route to show registration form
router.get('/register', showUserRegistrationForm);
//Route to process the user registration form
router.post('/register', processUserRegistrationForm);
/***************login routes*****************/
//router for showLoginForm
router.get('/login',showLoginForm);
//router for processLoginForm
router.post('/login', processLoginForm);
//router for logout
router.get('/logout', processLogout);
/************middleware route for required login*******/
router.get('/dashboard', requiredLogin, showDashboard);

export default router;