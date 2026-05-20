import { getAllProjects, getUpcomingProjects, getProjectDetails } from "../models/projects.js";
const NUMBER_OF_UPCOMING_PROJECTS = 5;

const projectsPage = async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Service Projects';
    // console.log(projects);
    res.render('projects', { title, projects });
};

const upcomingProjectsPage = async (req,res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = "Upcoming Service Projects";
    
    res.render('projects', {title, projects});
};

const showProjectDetailsPage = async (req,res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const title = "Project Details";
    
    res.render('project', {title, projectDetails});
}

export {projectsPage, upcomingProjectsPage, showProjectDetailsPage};