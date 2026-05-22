import db from './db.js'

const getAllProjects = async () => {
    const query = `
        SELECT 
          p.project_id, 
          p.organization_id,
          o.name, 
          p.title, 
          p.description, 
          p.location, 
          p.date
        FROM public.project p
        JOIN public.organization o
        ON p.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `SELECT 
                    project_id, 
                    organization_id, 
                    title, 
                    description, 
                    location, 
                    date 
                   FROM project
                   WHERE organization_id = $1
                   ORDER BY date; `;
    
    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;

};

const getUpcomingProjects = async(numOfProjects) => {
    const query = `SELECT
        p.project_id,
        p.title,
        p.description,
        p.date,
        p.location,
        p.organization_id,
        o.name AS organization_name
    FROM project p
    JOIN organization o
    ON p.organization_id = o.organization_id
    WHERE p.date >= CURRENT_DATE
    ORDER BY p.date ASC
    LIMIT $1;`;
    
    const queryParams = [numOfProjects];
    const result = await db.query(query, queryParams);
    // console.log(result.rows);
    return result.rows;
}

const getProjectDetails = async(projectId) => {
    const query = `SELECT
        p.project_id,
        p.title,
        p.description,
        p.date,
        p.location,
        p.organization_id,
        o.name AS organization_name
    FROM project p
    JOIN organization o
    ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;`;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    // console.log(result.rows);
    return result.rows[0];
}

const getProjectCategories = async(projectId) => {
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
                WHERE p.project_id = $1;`;

    const queryParams = [projectId];
    const result = await db.query(query,queryParams);
    console.log(result.rows);
    return result.rows;
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getProjectCategories };