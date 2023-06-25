/* 
 * Purpose: Creates the schema of the uOBites' application PostgreSQL database 
 * 
 * This file belongs to the "Create Database" suite that is executed in db.py
 * 
 * To execute the contents in this file, simply navigate to backend/database and run `python db.py`
 * That Python script will automatically execute this file. 
 * You can verify the changes in your local Postgres database using PSQL Shell or PgAdmin.
 */
CREATE TABLE IF NOT EXISTS User_account (
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);