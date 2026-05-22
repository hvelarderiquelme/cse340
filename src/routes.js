import express from 'express';

import {homePage} from './controllers/index.js';
import {organizationsPage} from './controllers/organizations.js';
import {projectsPage, upcomingProjectsPage} from './controllers/projects.js';
import {categoriesPage} from './controllers/categories.js';
import {testErrorPage} from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';
import { showProjectDetailsPage } from './controllers/projects.js';
import { showCategoryDetailsPage } from './controllers/categories.js';

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

export default router;