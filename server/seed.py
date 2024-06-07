#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Question, Questionnaire, Submission

if __name__ == '__main__':
    with app.app_context():
        
        print("Deleting all records... ")
        Questionnaire.query.delete()
        Submission.query.delete()
        Question.query.delete()
        User.query.delete()
        
        print("Creating users...")
        user1 = User(username = "user1", email = "user1@gmail.com", sex = "M", age = 27)
        user2 = User(username = "user2", email = "user2@gmail.com", sex = "F", age = 34)
        user3 = User(username = "user3", email = "user3@gmail.com", sex = "F", age = 42)

        user1.password_hash = user1.username + "password"
        user2.password_hash = user2.username + "password"
        user3.password_hash = user3.username + "password"

        users = [user1, user2, user3]
        db.session.add_all(users)
        db.session.commit()

        print("Creating questions...")
        question1 = Question(
            question_text = "Hey! How did you feel over the past 24 hours on a scale of Awful to Excellent (0 - 4)?"
        )
        question2 = Question(
            question_text = "In the past 24 hours, I felt in control of my behavior and decisions (0 - 4)."
            )
        question3 = Question(
            question_text = "In the past 24 hours, I felt supported by a sense of connectedness and/or community (0 - 4)."
        )
        question4 = Question(
            question_text = "In the past 24 hours, I was motivated to make good use of my time, spent it with intention, and lived in accordance with my values (0 - 4)."
        )
        question5 = Question(
            question_text = "In the past 24 hours, I felt as if I had adequate access to the basic necessities of life, and I was physically and psychologically safe (0 - 4)."
        )

        questions = [question1, question2, question3, question4, question5]
        db.session.add_all(questions)
        db.session.commit()

        print("Creating Submissions...")
        # submission 1 - user 1
        submission1 = Submission(
            user = user1
        )

        # submission 2 - user 2
        submission2 = Submission(
            user = user2
        )

        # submission 3 - user 3
        submission3 = Submission(
            user = user3
        )

        submissions = [submission1, submission2, submission3]
        db.session.add_all(submissions)
        db.session.commit()


        print("Creating Questionnaires...")

        # user 1
        questionnaire1 = Questionnaire(
            question = question1,
            score = 0,
            submission = submission1
        )

        questionnaire2 = Questionnaire(
            question = question2,
            score = 0,
            submission = submission1
        )

        questionnaire3 = Questionnaire(
            question = question3,
            score = 0,
            submission = submission1
        )

        questionnaire4 = Questionnaire(
            question = question4,
            score = 0,
            submission = submission1
        )

        questionnaire5 = Questionnaire(
            question = question5,
            score = 0,
            submission = submission1
        )

        # user 2
        questionnaire6 = Questionnaire(
            question = question1,
            score = 1,
            submission = submission2
        )

        questionnaire7 = Questionnaire(
            question = question2,
            score = 1,
            submission = submission2
        )

        questionnaire8 = Questionnaire(
            question = question3,
            score = 1,
            submission = submission2
        )

        questionnaire9 = Questionnaire(
            question = question4,
            score = 1,
            submission = submission2
        )

        questionnaire10 = Questionnaire(
            question = question5,
            score = 1,
            submission = submission2
        )

        # user 3
        questionnaire11 = Questionnaire(
            question = question1,
            score = 2,
            submission = submission3
        )

        questionnaire12 = Questionnaire(
            question = question2,
            score = 2,
            submission = submission3
        )

        questionnaire13 = Questionnaire(
            question = question3,
            score = 2,
            submission = submission3
        )

        questionnaire14 = Questionnaire(
            question = question4,
            score = 2,
            submission = submission3
        )

        questionnaire15 = Questionnaire(
            question = question5,
            score = 2,
            submission = submission3
        )

        questionnaires = [questionnaire1, questionnaire2, questionnaire3, questionnaire4, questionnaire5, questionnaire6, questionnaire7, questionnaire8, questionnaire9, questionnaire10, questionnaire11, questionnaire12, questionnaire13, questionnaire14, questionnaire15]
        db.session.add_all(questionnaires)
        db.session.commit()

        print("Seeding complete!")
