import psycopg2

####################
# Global variables #
####################
path_to_create_schema_file = "database/create_db.sql"
uobites_db_name = "uobites_db"
db_password = ""  # DO NOT COMMIT AND PUSH YOUR PASSWORD
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
    print("TO BE IMPLEMENTED")  # TODO: To be implemented once create_db.sql is done


if __name__ == "__main__":
    create_uobites_database()  # should be run first no matter what
    create_uobites_schema()  # should be run second no matter what
    populate_uobites_database()  # should be run third no matter what
