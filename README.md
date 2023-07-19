# uOBites
A fictional food ordering web application that allows users to place an online order from any of the food vendor on uOttawa's campus

Project Demo: [https://www.youtube.com/watch?v=M2wyG8Kt3fA](https://www.youtube.com/watch?v=oDk0JUee90M)


## Developer instructions
Below are the instructions to setup the project locally.

Clone and navigate to the root of the repo. Instructions below are in UNIX terminal (e.g. git bash terminal).

### Start Flask server
- Open terminal in root of repo
- `cd backend`  # navigate to the backend folder
- Install virtual environment and dependencies (first time only)
    - `python -m venv venv  # note that python may not work, try python3` 
    - `pip install flask  # or pip3`
    - `pip install -r requirements.txt  # install all dependencies`
- Start Flask environment
    - Activate Flask environment `source venv/Scripts/activate` OR `source venv/bin/activate`
    - Deactive Flask environment `deactivate  # servers can no longer start`
- `pip install flask  # installs Flask if you don't already have it`
- `python server.py  # to test the endpoints, go to localhost:5000/<ENDPOINT_NAME> (you can find endpoints in the @app.route("<ENDPOINT_NAME>") inside server.py`

### Start React frontend
- Open terminal in root of repo
- `cd frontend  # navigate to the frontend folder`
- Install dependencies (first time only)
    - `npm install  # installs dependencies; this will take a minute`
- `npm run start  # starts the frontend on localhost:3000`

### Start Cypress automated testing
- Open terminal in root of repo
- `cd frontend  # navigate to the frontend folder`
    - `npx cypress open  # opens the Cypress testing GUI`
    - `npx cypress run  # executes existing test suites directly in terminal`

### Set up PostgreSQL database
- Install PostgreSQL https://www.postgresql.org/download/ (follow a YouTube tutorial yourself if needed)
- Open terminal in root of repo
- `pip install psycopg2`
- Navigate to `backend/database`
    - Create a file called `config.py` and add the variable `postgres_password = ""` with your Postgres password as the value of the variable
    - **See example below on line 7**
  
    ![image](https://github.com/kienmarkdo/uOBites/assets/67518620/77e91325-4b53-4879-8af0-8ae3df940717)

- Run Python script to create the database schema and populate it with basic information
    - `python db.py  # takes care of database schema creation and population`
        - Can also execute this to refresh the database
        - You can open PgAdmin to verify that the data has been created properly
- Troubleshoot
    - If you see this error (on Windows)
![image](https://github.com/kienmarkdo/uOBites/assets/67518620/d10a2886-eed2-425c-8514-d59945fc2b21)
    - Go to Services. Find PostgreSQL. Right click and click Start.
 ![image](https://github.com/kienmarkdo/uOBites/assets/67518620/d5a461f6-6fd2-44b0-b078-9fbabc9994eb)


### Deployment using Ngrok self-hosting
For the purposes and scale of our project, hosting the PostgreSQL database, Flask backend, and TypeScript frontend is too complicated on popular cloud hosting solutions such as AWS, Azure, or Heroku. These solutions require some form of payment- either by the hour, or by the number of API calls; moreover, the setup is tedious and usually requires product-specific training and certification in order to know how to deploy a full-stack application. Given the short time that we have for our project, we have decided to go with a fast and free "cloud" solution using ngrok, a reverse proxy that creates a secure tunnel from a public endpoint to a locally running web service.

When we host a website on a server (AWS, Heroku, etc.), all we are doing is borrowing someone else's computer for them to run our frontend, backend, database, the same way we have to do locally, using commands like “npm run start”, “python app.py”, and then telling them to leave their computer on so that our web app can stay online 24/7. Instead of paying for Amazon Web Services or Microsoft Azure for their machines, ngrok allows us to host our full-stack application using our own computer as the server. It also provides a free domain to host our application. Anything the developer sees on localhost, ngrok will make available for anyone to view on the internet.


To get started:
- Create an Ngrok account then go to this URL
    - https://dashboard.ngrok.com/get-started/setup
    - Scroll down to **2. Connect your account**
    - Copy that command `ngrok config add-authtoken <YOUR_TOKEN>`
    - Open Terminal in root of project, run that command.
        - NOTE: you may need to run `./ngrok...` (with `./` in front of the command) instead of `ngrok`
- Start the server and generate a URL for the uOBites app
    - Open the terminal in the root of the project
    - Type `./ngrok http 3000 --host-header="localhost:3000"`
- Configure the proxy for the backend
    - Open `package.json`
    - In `"proxy": "EDIT_THIS_WITH_NGROK_URL:5000",`
    - Change "EDIT_THIS_WITH_NGROK_URL" to the randomly generated URL in the previous step
- Done 
    - You can send this URL to anyone and they will be able to use it
    - You will be able to see the requests come and go in your terminal as people use the app
    - To stop the server, simply `Ctrl + C`
    - The next time you run `./ngrok http 3000 --host-header="localhost:3000"` again, a new URL will be generated
        - Make sure to update package.json proxy as mentioned

