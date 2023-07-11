from flask import Flask, jsonify, request
import psycopg2
import database.config as config

app = Flask(__name__)

db_password = config.postgres_password  # Postgres password from config.py
uobites_db_name = "uobites_db"


# Replace the connection details with your own
conn = psycopg2.connect(
    host="localhost",
    dbname=uobites_db_name,
    user="postgres",
    password=db_password,
    port=5432
)
cursor = conn.cursor()


@app.route("/members")
def members():
    return {"members": ["Member1", "m2", "m3"]}


@app.route("/register_account", methods=["POST"])
def register_account():

    # Retrieve the data from the request
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    firstName = data["first_name"]
    lastName = data["last_name"]
    flex_card = data["flex_card"]

    # insert the user account into the database
    query = """
    INSERT INTO User_account (email, password, first_name, last_name, flex_card)
    VALUES (%s, %s, %s, %s, %s)
    """
    values = (email, password, firstName, lastName, flex_card)
    cursor.execute(query, values)
    conn.commit()

    # Get the generated user_id
    # user_id = cursor.fetchone()[0]

    # Return the response with the generated user_id
    # return jsonify({"id": user_id})
    return "Success"


if __name__ == "__main__":
    app.run(debug=True)  # debug=True because we are in development mode
