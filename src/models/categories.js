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

const getProjectsInCategory = async (categoryId) => {
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

const assignCategoryToProject = async (projectId, categoryId) => {
    console.log("CATEGORY ID===", categoryId);
    const query = `
        INSERT INTO project_category (
            project_id,
            category_id
        )
        VALUES (
            $1,
            $2
        );`;

    const queryParams = [projectId, categoryId];
    await db.query(query, queryParams);

};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    // REMOVE EXISTING CATEGORY ASSIGNMENTS
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;

    await db.query(deleteQuery, [projectId]);

    // ADD NEW CATEGORY ASSIGNMENTS
    console.log("BEFORE LOOP");
    for (const categoryId of categoryIds) {
        console.log("HELLO,HELLO");
        await assignCategoryToProject(projectId, categoryId);
    }
};

//Create New Category
const createCategory = async (name) => {
    const query = `
        INSERT INTO category (
            name
        )
        VALUES (
            $1
        )
        RETURNING category_id;
    `;

    const queryParams = [name];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new category with ID:', result.rows[0].category_id);
    }

    return result.rows[0].category_id;
};

//shows category to be edited
const getCategory = async (categoryId) => {
    const query = `
                SELECT
                    category_id,
                    name
                FROM
                    category
                WHERE
                    category_id = $1;
                `;
    const queryParams = [categoryId];            
    const result = await db.query(query, queryParams);

    if(result.rows.length === 0){
        throw new Error("No category found");
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Found category name:', result.rows[0].name);
    }

    return result.rows[0];
}

//when form is submittes, updates the name in Database
const updateCategory = async (categoryId, categoryName) => {
    const query = `
        UPDATE 
            category
        SET
            name = $2
        WHERE
            category_id = $1
        RETURNING 
            category_id;`;

    const queryParams = [categoryId, categoryName];
    const result = await db.query(query, queryParams);
    
    if(result.rows.length === 0){
        throw Error ('Unable to Update category');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Category updated successfully:', result.rows[0].name);
    }

    return result.rows[0];
}

export {
    getAllCategories,
    getProjectsInCategory,
    updateCategoryAssignments,
    createCategory,
    getCategory,
    updateCategory
}