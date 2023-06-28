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
    username VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Admin Account - do we need this?
-- idk since admin doesn't have any additional attribes 
CREATE TABLE IF NOT EXISTS Admin_account(
    admin_id SERIAL PRIMARY KEY,  
    user_id INTEGER NOT NULL,

    CONSTRAINT FK_user_id
        FOREIGN KEY(user_id)
        REFERENCES User_account(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);  

-- Food Outlets
CREATE TABLE IF NOT EXISTS Food_outlet(
    outlet_id SERIAL PRIMARY KEY,
    outlet_name VARCHAR(255),
    outlet_location VARCHAR(255),
    rating INTEGER
);

-- Vendor Account
CREATE TABLE IF NOT EXISTS Vendor_account(
    vendor_id SERIAL PRIMARY KEY,  
    user_id INTEGER NOT NULL,
    outlet_id INTEGER,
    accepts_Flex BOOLEAN,

    CONSTRAINT FK_user_id
        FOREIGN KEY(user_id)
        REFERENCES User_account(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

-- each vendor acc has one food outlet
    CONSTRAINT FK_outlet_id
        FOREIGN KEY(outlet_id)
        REFERENCES Food_outlet(outlet_id)
);  

-- Customer Account
CREATE TABLE IF NOT EXISTS Customer_account(
    cust_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    flex_card VARCHAR(255),

    CONSTRAINT FK_user_id
        FOREIGN KEY(user_id)
        REFERENCES User_account(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Food Orders
CREATE TABLE IF NOT EXISTS Food_orders(
    order_id SERIAL PRIMARY KEY,
    vendor_id INTEGER NOT NULL, --fk
    cust_id INTEGER NOT NULL, --fk
    order_status VARCHAR(255),
    total_price NUMERIC(10,2),

    CONSTRAINT FK_vendor_id
        FOREIGN KEY(vendor_id)
        REFERENCES Vendor_account(vendor_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT FK_cust_id
        FOREIGN KEY(cust_id)
        REFERENCES Customer_account(cust_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT Status_check
        CHECK(order_status IN ('In Progress','Ready','Completed', 'Cancelled')) --status must be In Progress, Ready, Completed, or Cancelled
    
);

-- Menus of all outlets
CREATE TABLE IF NOT EXISTS Menu_Item(
    item_id SERIAL PRIMARY KEY,
    outlet_id INTEGER NOT NULL, --fk
    cust_id INTEGER NOT NULL, --fk for customer for itemsOrdered[], tho i find it might be easier to attach this to Food_orders instead
    item_name VARCHAR(255),
    price NUMERIC(10,2),
    availability BOOLEAN,

    CONSTRAINT FK_outlet_id
        FOREIGN KEY(outlet_id)
        REFERENCES Food_outlet(outlet_id) --cascade or not?
        ON UPDATE CASCADE,

    CONSTRAINT FK_cust_id
        FOREIGN KEY(cust_id)
        REFERENCES Customer_account(cust_id) --do not delete cascade because we don't want menu item to be deleted if a customer or order is deleted
        ON UPDATE CASCADE
);

