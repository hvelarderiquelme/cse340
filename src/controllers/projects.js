import { body, validationResult } from 'express-validator';
import {
    getAllProjects,
    getUpcomingProjects,
    getProjectDetails,
    getProjectCategories,
    createProject,
    updateProject
} from "../models/projects.js";
import { getAllOrganizations } from "../models/organizations.js";

import { isUserVolunteer } from '../models/volunteers.js';

//validation rules
const projectValidation = [
    // TITLE
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Title must be between 3 and 200 characters'),

    // DESCRIPTION
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ max: 1000 })
        .withMessage('Description must be less than 1000 characters'),

    // LOCATION
    body('location')
        .trim()
        .notEmpty()
        .withMessage('Location is required')
        .isLength({ max: 200 })
        .withMessage('Location must be less than 200 characters'),

    // DATE
    body('date')
        .notEmpty()
        .withMessage('Date is required')
        .isISO8601()
        .withMessage('Date must be a valid date'),

    // ORGANIZATION ID
    body('organizationId')
        .notEmpty()
        .withMessage('Organization is required')
        .isInt()
        .withMessage('Organization ID must be a valid integer')
];

/*****************control the number of upcoming projects***************/
const NUMBER_OF_UPCOMING_PROJECTS = 5;

/*************************************************/
/*****************Shows all projects**************/
/*************************************************/
const projectsPage = async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Service Projects';
    // console.log(projects);
    res.render('projects', { title, projects });
};

/**********************************************************/
/**************Shows nuMber of upcoming projects***********/
/******* using the value in NUMBER_OF_UPCOMING_PROJECTS ***/
/**********************************************************/

const upcomingProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = "Upcoming Service Projects";

    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const projectCategories = await getProjectCategories(projectId);
    const title = "Project Details";
    let isVolunteer = false;

    if(req.session.user) {
        isVolunteer = await isUserVolunteer(req.session.user.user_id, projectId);
    }

    res.render('project', { title, projectDetails, projectCategories, isVolunteer });
}

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Create New Service Project';

    res.render('new-project', { title, organizations });
};

const processNewProjectForm = async (req, res) => {

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new project form
        return res.redirect('/new-project');
    }

    //Extract data from req.body
    const { organizationId, title, description, location, date } = req.body;

    try {
        const newProjectId = await createProject(organizationId, title, description, location, date);
        req.flash('success', 'New service project created sucessfully!');
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        console.error('Error creating new project: ', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }
};

/*********************************************************************/
/***********************functions to show the project******************/
/**********************information and to update information in ******/
/********************************** the form *************************/
/********************************************************************/

const showEditProjectForm = async (req,res) => {
    
    const projectId = req.params.projectId;
    const projectDetails = await getProjectDetails(projectId);
    const organizations = await getAllOrganizations();
    const title ="Edit Project Details";

    res.render('edit-project', {title, projectDetails, organizations});
}

const processEditProjectForm = async(req,res) => {
    //Check for validation errors
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        //Validation failed -loop through errors
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        })
        
        //redirect to edit-project
        return res.redirect('/edit-project/' + req.params.projectId,);
    }

    const projectId = req.params.projectId;
    const {organizationId, title, description, location, date} = req.body;
    await updateProject(projectId, organizationId, title, description, location, date);

    //Success flah message
    req.flash('success', 'Project Updated Successfully');
    res.redirect(`/project/${projectId}`);

};

export {
    projectsPage,
    upcomingProjectsPage,
    showProjectDetailsPage,
    createProject,
    showNewProjectForm,
    processNewProjectForm,
    projectValidation,
    showEditProjectForm,
    processEditProjectForm
};