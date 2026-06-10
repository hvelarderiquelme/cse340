import db from './db.js';

const addNewVolunteer = async (user_id, project_id) => {
    const query = `
            INSERT INTO volunteer (
                user_id,
                project_id
                )
            VALUES (
                $1,
                $2
            )
            RETURNING *;
            `;
    const queryParams = [user_id, project_id];
    await db.query(query,queryParams);
   
};

const isUserVolunteer = async(user_id, project_id) => {
    const query = `
            SELECT volunteer_id
            FROM volunteer
            WHERE user_id = $1
            AND project_id = $2;
            `;
    const queryParams = [user_id, project_id];
    const result = await db.query(query, queryParams);
    
    return result.rows.length > 0;
};

const removeVolunteerFromProject = async(user_id, project_id) => {
    const query = `
                DELETE FROM volunteer
                WHERE user_id = $1
                AND project_id = $2;
                `;
    
    const queryParams = [user_id, project_id];
    await db.query(query, queryParams);
};


export {
    addNewVolunteer,
    isUserVolunteer,
    removeVolunteerFromProject
}