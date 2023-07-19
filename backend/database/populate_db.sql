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
        'kien@uottawa.ca',
        '$2b$12$r4OEmDuoN00mX/8rA4GQGup6RtL1.bXwO22cxltina6yKmBZYFNrK', -- ABCD1234
        'Kien',
        'Do',
        NULL
    );

INSERT INTO
    User_account
VALUES
    (
        DEFAULT,
        'celine@uottawa.ca',
        '$2b$12$r4OEmDuoN00mX/8rA4GQGuUaSqFrk.xrGoZe4T53rjWIytUu8P1ue', -- password123
        'Celine',
        'Wan',
        123582920
    );

INSERT INTO
    User_account
VALUES
    (
        DEFAULT,
        'amy@uottawa.ca',
        '$2b$12$r4OEmDuoN00mX/8rA4GQGuYQDOOEkelyi9SzQ9wwuAPYkXndKLMQG', -- abc1234
        'Amy',
        'Kkiti',
        123109393
    );

INSERT INTO
    User_account
VALUES
    (
        DEFAULT,
        'jordan@uottawa.ca',
        '$2b$12$r4OEmDuoN00mX/8rA4GQGu4Tp2H9GSPDqgIswOtFulG/pEicJEqqm', -- 1234567
        'Jordan',
        'Takefman',
        123123123
    );