# SOEN390-Team-18-Covid-App
SOEN 390 group project. The goal is to design and implement a software project from the requirements provided by the teacher.


# Members
- Samaninder Singh; GH: SamSDK
- Mateo Palomino; GH: teoPalomino / mateopalo
- Yi Heng Yan; GH: miamiaNeko
- Tianyu Zhang: GH:woshidiyi1228
- Yuxin Wang; GH: shirlywy
- Faizan Ahmad; GH: AndroidBiscuit
- Massimo Lopez, GH: massimolopez11
- Arshia Hamidi, GH: Ashthedaddy
- Radu-Alex Ceban, GH: AlexCeban13

## Getting Started
 First, make sure you have Python3 and NodeJS installed on your local machine. You also need to install pipenv to <br>
 manage Python packages throughout the project, and run the python virtual environment.<br>
 in a terminal window, run the following command: ` pip install pipenv` then, use the following steps: <br>
 1. Clone the project to your local machine and in your terminal change directory to the project root.
 2. Inside the project root, where you can find the file _pipfile_, run the command `pipenv shell` to start the Python virtual environment.
 3. Run the command `pipenv install` to install all python packages and dependencies needed for the project.
 4. If there are any changes to the database models or the database is deleted, you need to run `python manage.py makemigrations` 
    and then `python manage.py migrate`.
 5. Run the command `python manage.py runserver` which will run the server.
 6. Check the page rendered by the project in your browser at `http://127.0.0.1:8000/`. This port will be use as our backend server.
 7. Open a separate terminal. cd into the _covid-application_ directory in the project root.
 8. Run `npx install` or `npm install` command to install all packages required for React and the front end app.
 9. Run `npm start` command to run the application at `http://127.0.0.1:3000/`.
 10. Access the application using `http://127.0.0.1:3000/`, but always have both ports running to run the full application.

 ## Deployment
 To visit the deployed website please go to https://agreeable-grass-04cb36610.1.azurestaticapps.net/
