import { 
    addNewVolunteer,
    removeVolunteerFromProject
 } from "../models/volunteers.js";

const newVolunteer = async(req,res) => {
    const project_id = req.params.projectId;
    const user_id = req.session.user.user_id;
    
    await addNewVolunteer(user_id, project_id);
    req.flash("success", "You have sucessfully volunteered for this project");
    res.redirect(`/project/${project_id}`);
};

const removeVolunteer = async(req,res) => {
    const project_id = req.params.projectId;
    const user_id = req.session.user.user_id;

    await removeVolunteerFromProject(user_id, project_id);
    req.flash('success', 'You have been sucessfully removed from this project');
    //res.redirect(`/project/${project_id}`);
    //res.redirect('/dashboard');
    const redirectTo = req.body.redirectTo || `/project/${project_id}`;
    return res.redirect(redirectTo);
}

export {
    newVolunteer,
    removeVolunteer
}