from flask import Flask

app = Flask(__name__)

# members API route


@app.route("/members")
def members():
    return {"members": ["Member1", "m2", "m3"]}


if __name__ == "__main__":
    app.run(debug=True)  # debug=True because we are in development mode
