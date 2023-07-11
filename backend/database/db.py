import psycopg2
import config

'''
Purpose: This file is meant for all things database-related, including the "Create Database" suite of scripts
that is executed to create the database schema, populate it with starting information, etc.
'''

####################
# Global variables #
####################
path_to_create_schema_file = "create_db.sql"
path_to_populate_db = "populate_db.sql"
uobites_db_name = "uobites_db"
db_password = config.postgres_password  # Add Postgres password in config.py
sql_commands = [
    """
    """,
]  # stores SQL commands


def create_uobites_database():
    '''
    Creates the database "uobites" in your local PostgreSQL
    Connect to the default postgres database then create a fresh (empty) uobites database
    '''

    # connect to default postgres database
    conn = psycopg2.connect(host="localhost", dbname="postgres",
                            user="postgres", password=db_password, port=5432)  # establish a connection to the db

    conn.autocommit = True  # allows the command CREATE DATABASE to run
    cursor = conn.cursor()  # allows sql command execution

    # create a fresh database for the uobites application
    cursor.execute("DROP DATABASE IF EXISTS {};".format(uobites_db_name))
    cursor.execute("CREATE DATABASE {};".format(uobites_db_name))

    # sends commands to the database ; close cursor and connection
    conn.commit()
    cursor.close()
    conn.close()


def create_uobites_schema():
    '''
    Connect to the newly created uobites database and execute SQL commands to create tables
    This function should only be run if the uobites database has been created
    '''

    # connect to uobites postgres database
    conn = psycopg2.connect(host="localhost", dbname=uobites_db_name,
                            user="postgres", password=db_password, port=5432)  # establish a connection to the db
    conn.autocommit = True
    cursor = conn.cursor()  # allows sql command execution

    # open the schema sql file that contains all SQL commands to create the db schema
    with open(path_to_create_schema_file, "r") as create_schema_file:
        create_schema_script = create_schema_file.read()

    # execute create schema script
    cursor.execute(create_schema_script)

    # sends commands to the database ; close cursor and connection
    conn.commit()
    cursor.close()
    conn.close()


def populate_uobites_database():
    '''
    Populates the uobites database with starter information
    This function should only be run if the uobites schema has been created
    '''
    # connect to uobites postgres database
    conn = psycopg2.connect(host="localhost", dbname=uobites_db_name,
                            user="postgres", password=db_password, port=5432)  # establish a connection to the db
    conn.autocommit = True
    cursor = conn.cursor()  # allows sql command execution

    # open the schema sql file that contains all SQL commands to create the db schema
    with open(path_to_populate_db, "r") as populate_db_file:
        populate_db_script = populate_db_file.read()

    # execute create schema script
    cursor.execute(populate_db_script)

    # sends commands to the database ; close cursor and connection
    conn.commit()
    cursor.close()
    conn.close()


if __name__ == "__main__":
    create_uobites_database()  # should be run first no matter what
    create_uobites_schema()  # should be run second no matter what
    populate_uobites_database()  # must be run after create_uobites_schema
