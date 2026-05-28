import { getProjectCategories, getProjectDetails } from "../models/projects.js"
import {
    getAllCategories,
    getProjectsInCategory,
    updateCategoryAssignments
} from "../models/categories.js";

const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Categories';
    //console.log(categories);
    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getProjectsInCategory(categoryId);
    const title = `Projects for ${categoryDetails[0].category_name}`;
    console.log(categoryDetails);
    res.render('category', { title, categoryDetails });
}

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getProjectCategories(projectId);
    const title = 'Assign Categories to Project';

    res.render('assign-categories', {
        title,
        projectId,
        projectDetails,
        categories,
        assignedCategories
    });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const categoryIds = req.body.categoryIds || [];

    //Ensure categoryIds is an array
    const categoryIdsArray = Array.isArray(categoryIds) ? categoryIds : [categoryIds];

    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories processed successfully');
    res.redirect(`/project/${projectId}`);

}

export {
    categoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    updateCategoryAssignments
};