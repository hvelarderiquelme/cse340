import { 
    addNewVolunteer,
    removeVolunteerFromProject,
 } from "../models/volunteers.js";

 import {
    getVolunteerProjects,
    getUserById
 } from "../models/users.js";

const newVolunteer = async(req,res) => {
    const project_id = req.params.projectId;
    const user_id = req.session.user.user_id;
    
    await addNewVolunteer(user_id, project_id);
    req.flash("success", "You have sucessfully volunteered for this project");
    res.redirect(`/project/${project_id}`);
};

const removeVolunteer = async(req,res) => {
    const project_id = req.params.projectId;
    //const user_id = req.session.user.user_id;

    let user_id;
    if (req.session.user.role_name === 'admin'){
        user_id = req.body.userId;
    }else{
        user_id = req.session.user.user_id;
    }
    console.log("*******************USER ID=", user_id);
    console.log("******************project ID=", project_id);
    await removeVolunteerFromProject(user_id, project_id);
    req.flash('success', 'User has been sucessfully removed from this project');
    //res.redirect(`/project/${project_id}`);
    //res.redirect('/dashboard');
    const redirectTo = req.body.redirectTo || `/project/${project_id}`;
    return res.redirect(redirectTo);
};

const showUserVolunteerProjects = async(req,res) => {
    const userId = req.params.userId;
    const volunteerProjects = await getVolunteerProjects(userId);
    const user = await getUserById(userId);
    const title = `Volunteer Projects for ${user}`;

    res.render('user-volunteer-projects', {title, volunteerProjects})
};

export {
    newVolunteer,
    removeVolunteer,
    showUserVolunteerProjects
}