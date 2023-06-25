# uOBites
A fictional food ordering web application that allows users to place an online order from any of the food vendor on uOttawa's campus



## Developer instructions
You need to start the backend (Flask server) and the frontend (React-TypeScript).

Clone and navigate to the root of the repo. Instructions below are in bash terminal (e.g. git bash terminal).

### Start Flask server
- Open terminal in root of repo
- `cd backend` # navigate to the backend folder
- Install virtual environment (first time only)
    - `python -m venv venv`
    - `pip install flask`
    - `pip install -r requirements.txt`
- Start Flask environment
    - `source venv/Scripts/activate # activates the Flask environment`
    - `deactivate # deactivates Flask environment; servers will no longer be able to start`
- `pip install flask # installs Flask if you don't already have it`
- `python FILENAME.py # starts your server on localhost:5000`

### Start React frontend
- Open terminal in root of repo
- `cd frontend # navigate to the frontend folder`
- Install dependencies (first time only)
    - `npm install # installs dependencies; this will take a minute`
- `npm run start # starts the frontend on localhost:3000`

### Start Cypress automated testing
- Open terminal in root of repo
- `cd frontend # navigate to the frontend folder`
- `npx cypress open # opens the Cypress testing GUI`

### Set up PostgreSQL database
- Install PostgreSQL https://www.postgresql.org/download/ (follow a YouTube tutorial yourself if needed)
- Open terminal in root of repo
- `pip install psycopg2`
- Create and populate the database with basic information
    - `python create_db.py`
        - You can open PgAdmin to verify that the data has been created properly
- Troubleshoot
    - If you see this error
![image](https://github.com/kienmarkdo/uOBites/assets/67518620/d10a2886-eed2-425c-8514-d59945fc2b21)
    - Go to Services. Find PostgreSQL. Right click and click Start.
 ![image](https://github.com/kienmarkdo/uOBites/assets/67518620/d5a461f6-6fd2-44b0-b078-9fbabc9994eb)

