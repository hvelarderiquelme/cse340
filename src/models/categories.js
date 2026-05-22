import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT 
            category_id,
            name
        FROM
            public.category;    
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsInCategory = async(categoryId) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name,
            c.category_id,
            c.name AS category_name
        FROM project p
        JOIN organization o
        ON p.organization_id = o.organization_id
        JOIN project_category pc
        ON p.project_id = pc.project_id
        JOIN category c
        ON pc.category_id = c.category_id
        WHERE c.category_id = $1
        ORDER BY p.date ASC;`;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams)
    console.log(result.rows);

    return result.rows;
}

export { getAllCategories, getProjectsInCategory }