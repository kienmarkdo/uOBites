from flask import Flask, jsonify, request
import psycopg2
import database.config as config

app = Flask(__name__)

db_password = config.postgres_password  # Postgres password from config.py
uobites_db_name = "uobites_db"


# Connect to uobites database
def connect_to_database():
    conn = psycopg2.connect(
        host="localhost",
        dbname=uobites_db_name,
        user="postgres",
        password=db_password,
        port=5432
    )
    return conn


@app.route("/register_user", methods=["POST"])
def register_user():
    """
    API endpoint for registering a new user account
    """

    # connect to PostgreSQL database
    conn = connect_to_database()
    cursor = conn.cursor()

    # Retrieve the data from the request
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    firstName = data["first_name"]
    lastName = data["last_name"]
    flex_card = data["flex_card"]

    # Check if the username already exists
    cursor.execute(
        "SELECT user_id FROM user_account WHERE email = %s", (email,))
    existing_user = cursor.fetchone()
    if existing_user:
        cursor.close()
        conn.close()
        return jsonify({'message': 'Username already exists'})

    # insert the user account into the database
    query = """
    INSERT INTO User_account (email, password, first_name, last_name, flex_card)
    VALUES (%s, %s, %s, %s, %s)
    """
    values = (email, password, firstName, lastName, flex_card)
    cursor.execute(query, values)
    conn.commit()
    cursor.close()  # close db connection
    conn.close()

    # Get the generated user_id
    # user_id = cursor.fetchone()[0]

    # Return the response with the generated user_id
    return jsonify({'message': 'User registered successfully'})
    # return "Success"

@app.route("/login_user", methods=["POST"])
def login_user():
    """
    API endpoint that logs in a user
    """
    conn = connect_to_database()
    c1 = conn.cursor()

    data = request.get_json()
    email = data["email"]
    password = data["password"]

    query = "SELECT * FROM user_account WHERE email = %s AND password = %s"
    values = (email,password)
    c1.execute(query, values)

    entry = c1.fetchone()
    c1.close()
    conn.close()

    # if email and password match an account
    if entry:
        return jsonify({'exists':True, 'message':'Login successful'})
    else:
        return jsonify({'exists':False, 'message':'Wrong password or email entered'})
    

@app.route("/get_all_users", methods=["GET"])
def get_all_users():
    """
    API endpoint that fetches all existing users in the database and stores their info in a variable
    """
    conn = connect_to_database()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM User_account")
    rows = cursor.fetchall()
    users = []
    for row in rows:
        user = {
            'user_id': row[0],
            'email': row[1],
            'password': row[2],
            'first_name': row[3],
            'last_name': row[4],
            'flex_card': row[5]
        }
        users.append(user)
    cursor.close()
    conn.close()
    return jsonify(users)


@app.route("/check_user_exists", methods=["POST"])
def check_user_exists():
    """
    API endpoint that checks if a user exists in the database or not, given username as input
    """

    conn = connect_to_database()
    cursor = conn.cursor()
    username = request.form.get("username")
    cursor.execute("SELECT * FROM user_account WHERE email = %s", (username,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    if user:
        return jsonify({'exists': True})
    else:
        return jsonify({'exists': False})


@app.route("/get_user_info", methods=["POST"])
def get_user_info():
    """
    API endpoint that fetches a user's details given their username
    Can also be used to check if a username already exists in the database or not
    """

    conn = connect_to_database()
    cur = conn.cursor()

    username = request.form.get("username")
    cur.execute("SELECT * FROM user_account WHERE email = %s", (username,))
    user = cur.fetchone()

    cur.close()
    conn.close()

    if user:
        user_info = {
            'user_id': user[0],
            'email': user[1],
            'password': user[2],
            'first_name': user[3],
            'last_name': user[4],
            'flex_card': user[5]
        }
        return jsonify(user_info)
    else:
        return jsonify({'message': 'User not found'})


if __name__ == "__main__":
    app.run(debug=True)  # debug=True because we are in development mode
