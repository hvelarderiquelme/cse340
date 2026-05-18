import { getAllProjects } from "../models/projects.js";

const projectsPage = async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Service Projects';
    // console.log(projects);
    res.render('projects', { title, projects });
};

export {projectsPage};