import db from './db.js'
import bcrypt from 'bcrypt';

const createNewUser = async(name, email, password_hash) => {
    const role_name = 'user';
    const query = `
        INSERT INTO 
            users (name, email, password_hash, role_id)
            VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4))
            RETURNING user_id;`;

    const queryParams = [name, email, password_hash, role_name];
    const result = await db.query(query,queryParams);

    if (result.rows.length === 0){
        throw new Error("failed to create new user.");
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true'){
        console.log("Created new usewr with ID: ", result.rows[0].user_id);
    }
    return result.rows[0].user_id;
}

const findUserByEmail = async (email) => {
    const query = `
        SELECT u.user_id, u.email, u.password_hash, r.role_name 
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = $1`;
        
    const queryParams = [email];
    
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        return null; // User not found
    }
    
    return result.rows[0];
};

const verifyPassword = async (password, password_hash) => {
    return bcrypt.compare(password, password_hash);
};

const authenticateUser = async(email, password) => {
    const user = await findUserByEmail(email);

    if(!user){
        return null;
    }

    const isPasswordCorrect = await verifyPassword(password, user.password_hash);
    if (isPasswordCorrect) {
        delete user.password_hash;//cleanly deletes the property from the object
        return user;
    }

    return null;
};

const getUsersList = async () => {
    const query =`
            SELECT u.name, u.email, r.role_name
            FROM users u
            JOIN roles r
            ON u.role_id = r.role_id;
            `;

    const result = await db.query(query);

    return result.rows;
};

const getVolunteerProjects = async (user_id) => {
    const query = `
            SELECT
                p.project_id,
                p.title,
                p.description,
                p.date,
                p.location
            FROM volunteer v
            JOIN project p
            ON v.project_id = p.project_id
            WHERE v.user_id = $1
            ORDER BY p.date;`;
    const queryParams = [user_id];
    const result = await db.query(query, queryParams);
    
    return result.rows;
}

export{ 
    createNewUser,
    authenticateUser,
    getUsersList,
    getVolunteerProjects
 }