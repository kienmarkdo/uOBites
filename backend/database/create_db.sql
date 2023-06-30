/* 
 * Purpose: Creates the schema of the uOBites' application PostgreSQL database 
 * 
 * This file belongs to the "Create Database" suite that is executed in db.py
 * 
 * To execute the contents in this file, simply navigate to backend/database and run `python db.py`
 * That Python script will automatically execute this file. 
 * You can verify the changes in your local Postgres database using PSQL Shell or PgAdmin.
 */
-- User Account
CREATE TABLE IF NOT EXISTS User_account (
    user_id SERIAL PRIMARY KEY,
    -- email is username
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
);

-- Admin Account
CREATE TABLE IF NOT EXISTS Admin_account (
    admin_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    CONSTRAINT FK_user_id FOREIGN KEY(user_id) REFERENCES User_account(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Customer Account
CREATE TABLE IF NOT EXISTS Customer_account (
    customer_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    flex_card VARCHAR(255),
    CONSTRAINT FK_user_id FOREIGN KEY(user_id) REFERENCES User_account(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Food Outlet Account / Vendor account
-- allows employees of a food outlet to login to their own outlet page
CREATE TABLE IF NOT EXISTS Vendor_account (
    vendor_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    outlet_id INTEGER,
    accepts_flex BOOLEAN,
    CONSTRAINT FK_user_id FOREIGN KEY(user_id) REFERENCES User_account(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    -- each vendor acc has one food outlet
    CONSTRAINT FK_outlet_id FOREIGN KEY(outlet_id) REFERENCES Food_outlet(outlet_id)
);

-- Food Outlet
CREATE TABLE IF NOT EXISTS Food_outlet (
    outlet_id SERIAL PRIMARY KEY,
    outlet_name VARCHAR(255),
    outlet_location VARCHAR(255),
    -- sum of all ratings
    total_rating_points INTEGER,
    -- the number of users who have rated this food outlet
    total_num_of_ratings INTEGER,
    -- Example of ratings:
    -- total_rating_points = 4 + 5 + 3 + 2 (existing ratings)
    -- total_num_of_ratings = 4 (people who rated)
    -- to calculate food outlet's ratings: rating = total_rating_points / total_num_of_ratings
    -- add a new rating from user Bob, who gives a rating of 4
    -- total_rating_points = (4 + 5 + 3 + 2) + 4
    -- total_num_of_ratings = 5 + 1
    CONSTRAINT total_rating_points >= 0,
    CONSTRAINT total_num_of_ratings >= 0
);

-- Food Orders
CREATE TABLE IF NOT EXISTS Food_orders (
    order_id SERIAL PRIMARY KEY,
    order_status VARCHAR(255),
    total_price NUMERIC(10, 2),
    --fk
    vendor_id INTEGER NOT NULL,
    --fk
    cust_id INTEGER NOT NULL,
    --fk
    CONSTRAINT FK_vendor_id FOREIGN KEY(vendor_id) REFERENCES Vendor_account(vendor_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT FK_cust_id FOREIGN KEY(cust_id) REFERENCES Customer_account(cust_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT Status_check CHECK(
        order_status IN ('In Progress', 'Ready', 'Completed', 'Cancelled')
    ) -- status must be In Progress, Ready, Completed, or Cancelled
);

-- Menus of all outlets
CREATE TABLE IF NOT EXISTS Menu_item (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(255),
    price NUMERIC(10, 2),
    --fk
    outlet_id INTEGER NOT NULL,
    --fk
    cust_id INTEGER NOT NULL,
    --fk for customer for itemsOrdered[], tho i find it might be easier to attach this to Food_orders instead
    availability BOOLEAN,
    CONSTRAINT FK_outlet_id FOREIGN KEY(outlet_id) REFERENCES Food_outlet(outlet_id) --cascade or not?
    ON UPDATE CASCADE,
    CONSTRAINT FK_cust_id FOREIGN KEY(cust_id) REFERENCES Customer_account(cust_id) --do not delete cascade because we don't want menu item to be deleted if a customer or order is deleted
    ON UPDATE CASCADE
);