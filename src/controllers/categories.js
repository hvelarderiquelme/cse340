import { getAllCategories } from "../models/categories.js";

const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Categories';
    //console.log(categories);
    res.render('categories', { title, categories });
};

export { categoriesPage };