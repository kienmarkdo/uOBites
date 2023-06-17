import psycopg2

####################
# Global variables #
####################
uobites_db_name = "uobites_db"
db_password = ""  # DO NOT COMMIT AND PUSH YOUR PASSWORD
sql_commands = [
    """
    CREATE TABLE IF NOT EXISTS User_account (
        username VARCHAR(255) PRIMARY KEY,
        password VARCHAR(255) NOT NULL,
    );
    """,
]


def create_uobites_db():
    '''
    Creates a fresh uobites database
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


def connect_to_uobites_db():
    '''Connect to the newly created uobites database and execute SQL commands'''

    # connect to uobites postgres database
    conn = psycopg2.connect(host="localhost", dbname=uobites_db_name,
                            user="postgres", password=db_password, port=5432)  # establish a connection to the db
    conn.autocommit = True
    cursor = conn.cursor()  # allows sql command execution

    # execute all database commands
    for command in sql_commands:
        cursor.execute(command)

    # sends commands to the database ; close cursor and connection
    conn.commit()
    cursor.close()
    conn.close()


if __name__ == "__main__":
    create_uobites_db()
    connect_to_uobites_db()
