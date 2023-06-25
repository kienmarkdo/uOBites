/* 
 * Creates the schema of the uOBites' application PostgreSQL database 
 */
CREATE TABLE IF NOT EXISTS User_account (
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);