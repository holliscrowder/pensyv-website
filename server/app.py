#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, jsonify, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api

# Add your model imports
from models import User, Question, Questionnaire, Submission

# Views go here!
@app.route('/api')
def index():
    return '<h1>Project Server</h1>'

class Signup(Resource):
    def post(self):
        json = request.get_json()
        try:
            user_test_email = User.query.filter_by(email=json.get("email")).first()
            user_test_username = User.query.filter_by(username=json.get("username")).first()
            if user_test_email:
                print(user_test_email)
                return make_response({"user_status": "Invalid email, please try again."}, 401)
            elif user_test_username:
                return make_response({"user_status": "Invalid username, please try again."}, 401)
            
            elif not User.query.filter_by(email = json.get("email")).first() and not User.query.filter_by(username = json.get("username")).first():
                # create new user
                user = User(
                    username = json.get("username"),
                    email = json.get("email")
                )

                # update session info
                db.session.add(user)
                db.session.commit()
                session["user_id"] = user.id
                
                # return user info
                user_response = jsonify(user.to_dict())
                return make_response(user_response, 201)
            
        # check for errors
        except IntegrityError:
            return make_response({"error": "Database relational integrity error"}, 422)
        except ValueError:
            return make_response({"error": "User information value invalid"}, 422)

class CheckSession(Resource):
    def get(self):
        # check if session has user ID
        if session["user_id"]:
            # create user based on unique user ID
            user = User.query.filter(User.id == session["user_id"]).first()
            
            # return user info
            user_response = jsonify(user.to_dict())
            return make_response(user_response, 200)
        
        return make_response({"error": "Unauthorized"}, 401)
    
class Login(Resource):
    def post(self):
        # set session ID
        email = request.get_json().get("email")
        user = User.query.filter_by(email=email).first()
        if user:
            session["user_id"] = user.id
            user_response = jsonify(user.to_dict())
        # return user info
            response = make_response(user_response, 200)
            return response
            
        # check for errors
        else:
            return make_response({"email_status": "Unauthorized email"}, 401)
        
class Logout(Resource):
    def delete(self):
        # reset session ID
        if session["user_id"]:
            session["user_id"] = None

            # return empty response
            return make_response({"message": "204: No Content"}, 204)
        return make_response({"error": "User not logged in"}, 401)

class Questions(Resource):
    
    # retrieve all questions
    def get(self):
        # gather all questions
        questions = [question.to_dict() for question in Question.query.all()]

        # return questions
        questions_response = jsonify(questions)
        return make_response(questions_response, 200)
    
class Users(Resource):

    # update user information
    def patch(self):
        # find user being updated
        user = User.query.filter(User.id == session["user_id"]).first()
        
        if not user:
            return make_response({"error": "User not found"}, 404)
        
        user_data = request.get_json()
        try:
            # update user info
            user.username = user_data.get("username")
            user.email = user_data.get("email")
            db.session.add(user)
            db.session.commit()
            user_response = jsonify(user.to_dict())

            # return updated user info
            return make_response(user_response, 201)
        except IntegrityError:
            return make_response({"error": "Database relational integrity error"}, 422)
        except ValueError:
            return make_response({"error": "User information value invalid"}, 422)

    # delete user and all their data
    def delete(self):
        # find user to delete
        user = User.query.filter(User.id == session["user_id"]).first()
        if not user:
            return make_response({"error": "User not found"}, 404)
        
        # delete user
        db.session.delete(user)
        db.session.commit()

        # reset session ID
        session["user_id"] = None

        # return empty message
        return make_response({"message": "204: No content"}, 204)
    
class Questionnaires(Resource):
    def post(self):
        if not session['user_id']:
            return make_response({"error": "Not authorized."}, 401)
        questionnaires = request.get_json()
        print(questionnaires)
        new_questionnaires = []
        try:
            new_submission = Submission(user_id = session["user_id"])
            db.session.add(new_submission)
            db.session.commit()

            i = 1
            for questionnaire in questionnaires:
                question_id = f"{i}"
                score = questionnaires[questionnaire]
                submission_id = new_submission.id

                new_questionnaire = Questionnaire(question_id = question_id, score = score, submission_id = submission_id)
                db.session.add(new_questionnaire)
                db.session.commit()
                new_questionnaires.append(new_questionnaire)
                i += 1
            questionnaires_response = jsonify([questionnaire.to_dict() for questionnaire in new_questionnaires])

            return make_response(questionnaires_response, 201)      
        # check for errors
        except IntegrityError:
            return make_response({"error": "Database relational integrity error"}, 422)

api.add_resource(Signup, "/api/signup", endpoint = "signup")
api.add_resource(CheckSession, "/api/check_session", endpoint = "check_session")
api.add_resource(Login, "/api/login", endpoint = "login")
api.add_resource(Logout, "/api/logout", endpoint = "logout")
api.add_resource(Questions, "/api/questions", endpoint = "questions")
api.add_resource(Users, "/api/users", endpoint = "users")
api.add_resource(Questionnaires, "/api/questionnaires", endpoint = "questionnaires")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

