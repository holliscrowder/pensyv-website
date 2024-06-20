# Pensyv Website

## Introduction

Our mission is simple... we want to help you measure what matters most: mental health. Pensyv is developing an app to help you log and visualize mental health over time. Alpha testers can participate by creating a user profile and filling out a simple daily questionnaire in less time than it takes to listen to their favorite song. Users can track their questionnaire reponses over time via data visualizations on the homepage. User and questionnaire data are posted to the backend, where they are then stored on a secure database. Privacy is a top priority; users can leave alpha testing anytime by removing their profile and all associated data. Future versions of the app will incorporate sophisticated statistical analyses and will enable users to opt in to data sharing for macro-level research. 

---

## Features

_Sign Up:_ Create a user profile on the sign up page by entering an email and username.

_Login:_ Login with the email entered during sign up.

_Logout:_ Logout any time from any page via the 'Logout' button.

_Survey:_ Fill out the daily questionnaire by answering the five questions on a scale of 0-4.

_Home:_ View the pensyv mission statement when logged out, and view graphical data visualizations when logged in.

_Profile:_ View user profile details and update, if desired.

_Leave:_ Leave alpha testing by entering the associated email and username.

## Demo
![Demo GIF](client/public/pensyv_quesitonnaire_gif.gif)

## Development Instructions

1. Clone the repository to your local machine. From the top-level of the directory:
2. Install frontend dependencies using _npm install --prefix client_
3. Run the frontend development server using _npm start --prefix client_
4. Access the website through your browser at _http://localhost:3000_
4. Install backend dependencies using _pipenv install --prefix client_
5. Run the backend virtual environment using _pipenv shell_
6. Run the backend development server using _python server/app.py_
7. Access the backend API via proxy through your browser at _http://localhost:5555/_
8. Seed mock user data using _python server/seed.py_

## Resources - Pensyv Website API
The Pensyv frontend is connected to the backend via API, resources for which are defined in _server/app.py_. Resources (routes) and supported methods include:

_signup_:
  * post()

_check_session_:
  * get()

_login_:
  * post()

_logout_:
  * delete()

_questions_:
  * get()

_users_:
  * patch()
  * delete()

_questionnaires_:
  * get()
  * post()

## Programs Used
Frontend:
- Javascript
- HTTP client for making API requests
- React: Frontend framework for building interactive user interfaces
  - React Router: Library for handling navigation within a React application
  - Formik, yup: Library for handling and validating form submissions
  - Recharts: Library for handling graphical data visualization

Backend:
- Python
- Flask: Micro web framework used for developing web applications using python, implemented on Wekzeug and Jinja2.
  - SQLAlchemy: Python SQL toolkit and ORM (Object Relational Mapper) used for accessing the database
  - Flask-restful: Flask extension used for building REST APIs
  - Flask-migrate: Flask extension used for handling SQLAlchemy database migrations for Flask applications using Alembic
  - Flask-cors: Flask extension used for enabling Corss Origin Resource Sharing on all routes
