import { getProjectCategories, getProjectDetails } from "../models/projects.js"
import { body, validationResult } from 'express-validator';
import {
    createCategory,
    getAllCategories,
    getProjectsInCategory,
    updateCategoryAssignments
} from "../models/categories.js";

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Category name must be between 3 and 150 characters')
];

const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Categories';
    //console.log(categories);
    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getProjectsInCategory(categoryId);

   // No rows found
    if (categoryDetails.length === 0) {

        req.flash(
            'error',
            `No projects found for the category you selected`
        );

        return res.redirect('/categories');
    }
    const title = `Projects for ${categoryDetails[0].category_name}`;
    //console.log(categoryDetails);
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

//Shows the new category form to be filled
const showNewCategoryForm = async (req,res) => {
    const title = "Add New Category";
    res.render('new-category', { title });
}

//Process the new category and adds it to the database
const processNewCategoryForm = async(req,res) => {

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new project form
        return res.redirect('/new-category');
    }

    const categoryName = req.body.name;
    const categoryId = await createCategory(categoryName);
    req.flash('success', 'Category Created Successfully');
    res.redirect(`/categories`);
}

export {
    categoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    updateCategoryAssignments,
    showNewCategoryForm, 
    processNewCategoryForm,
    categoryValidation
};