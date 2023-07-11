/* 
 * Purpose: Populates the uOBites' application PostgreSQL database with basic dummy information 
 * 
 * This file belongs to the "Create Database" suite that is executed in db.py
 * 
 * To execute the contents in this file, simply navigate to backend/database and run `python db.py`
 * That Python script will automatically execute this file. 
 * You can verify the changes in your local Postgres database using PSQL Shell or PgAdmin.
 */
INSERT INTO
    User_account
VALUES
    (
        DEFAULT,
        'kien@kien.com',
        'ABCD1234',
        'Kien',
        'D',
        NULL
    );

INSERT INTO
    User_account
VALUES
    (
        DEFAULT,
        'bob@bob.com',
        'ABCD1234',
        'Bob',
        'Marley',
        123123123
    );