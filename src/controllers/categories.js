import { getAllCategories, getProjectsInCategory } from "../models/categories.js";

const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Categories';
    //console.log(categories);
    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req,res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getProjectsInCategory(categoryId);
    const title = `Projects for ${categoryDetails[0].category_name}`;
    console.log(categoryDetails);
    res.render('category', { title, categoryDetails });
}

export { categoriesPage, showCategoryDetailsPage };