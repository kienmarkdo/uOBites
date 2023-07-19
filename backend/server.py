from flask import Flask, jsonify, request
import psycopg2
import database.config as config
import bcrypt

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

    # generates a salt to hash the password, and adds an extra layer of security
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode(
        'utf-8'), salt)  # Hash the password using the salt

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
    values = (email, hashed_password.decode(
        'utf-8'), firstName, lastName, flex_card)
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

    query = "SELECT * FROM user_account WHERE email = %s"
    values = (email,)
    c1.execute(query, values)

    entry = c1.fetchone()

    if entry:
        # gets the password and encodes it in order to use function checkpw
        password_in_db = entry[2].encode('utf-8')
        # compares the input of the user and the hashed password in the db
        do_password_match = bcrypt.checkpw(
            password.encode('utf-8'), password_in_db)

        # checks if password matches
        if do_password_match:
            match = True
        else:
            match = False
    else:
        match = False

    c1.close()
    conn.close()

    # if email and password match an account
    if match:
        return jsonify({'exists': True, 'message': 'Login successful'})
    else:
        return jsonify({'exists': False, 'message': 'Wrong password or email entered'})


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


@app.route("/get_user_info", methods=["GET"])
def get_user_info():
    """
    API endpoint that fetches a user's details given their email
    Can also be used to check if an email already exists in the database or not
    email needs to be passed as a parameter
    """

    conn = connect_to_database()
    cur = conn.cursor()

    email = request.args.get("email")
    cur.execute("SELECT * FROM user_account WHERE email = %s", (email,))
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


@app.route("/update_user_info", methods=["PUT"])
def update_user_info():
    """
    API endpint that updates database entry for a user
    given first name, last name and flex card
    for edit profile
    """

    conn = connect_to_database()
    c1 = conn.cursor()

    data = request.get_json()
    email = data["email"]
    firstName = data["first_name"]
    lastName = data["last_name"]
    flex_card = data["flex_card"]

    query = ''' 
    UPDATE user_account
    SET first_name = %s,
    last_name = %s,
    flex_card = %s
    where email = %s
    '''

    values = (firstName, lastName, flex_card, email)
    c1.execute(query, values)

    conn.commit()
    c1.close()
    conn.close()

    return jsonify({
        'message': 'Successfully updated profile information'})


if __name__ == "__main__":
    # app.run(debug=True)  # debug=True because we are in development mode
    app.run(debug=False)
