#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Question, Questionnaire, Submission
from random import randint, choice
from faker import Faker

fake = Faker()

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

        # create 100 blank (empty) submissions
        num_submissions = 100
        submissions1 = [0] * num_submissions
        submissions2 = [0] * num_submissions
        submissions3 = [0] * num_submissions

        # create 100 submissions for each user, with 5% probability of checked = true
        for i in range(num_submissions):
            submissions1[i] = Submission( user = user1, checked = fake.pybool(truth_probability=5) )
            submissions2[i] = Submission( user = user2, checked = fake.pybool(truth_probability=5) )
            submissions3[i] = Submission( user = user3, checked = fake.pybool(truth_probability=5) )

        # # submission 1 - user 1
        # submission1 = Submission(
        #     user = user1
        # )

        # # submission 2 - user 2
        # submission2 = Submission(
        #     user = user2
        # )

        # # submission 3 - user 3
        # submission3 = Submission(
        #     user = user3
        # )

        # submissions = [submission1, submission2, submission3]
        db.session.add_all(submissions1)
        db.session.add_all(submissions2)
        db.session.add_all(submissions3)
        db.session.commit()

        print("Creating Questionnaires...")
        # create 5 questionnaires for each submission
        num_questionnaires = num_submissions * 5
        questionnaires1 = []
        questionnaires2 = []
        questionnaires3 = []

        # create array of questionnaires associated with each user
        questionnaires_array = [questionnaires1, questionnaires2, questionnaires3]
        submissions_array = [submissions1, submissions2, submissions3]

        # create 5 questionnaires for each submission for each user
        for i in range(len(questionnaires_array)): 
            j = 0
            for k in range(0, num_questionnaires - 5, 5):
                questionnaires_array[i].append(
                    Questionnaire(
                        question = question1,
                        score = fake.pyint(min_value = 0, max_value = 4, step = 1),
                        submission = submissions_array[i][j]
                    )
                )
                questionnaires_array[i].append(
                    Questionnaire(
                        question = question2,
                        score = fake.pyint(min_value = 0, max_value = 4, step = 1),
                        submission = submissions_array[i][j]
                    )
                )
                questionnaires_array[i].append(
                    Questionnaire(
                        question = question3,
                        score = fake.pyint(min_value = 0, max_value = 4, step = 1),
                        submission = submissions_array[i][j]
                    )
                )
                questionnaires_array[i].append(
                    Questionnaire(
                        question = question4,
                        score = fake.pyint(min_value = 0, max_value = 4, step = 1),
                        submission = submissions_array[i][j]
                    )
                )
                questionnaires_array[i].append(
                    Questionnaire(
                        question = question5,
                        score = fake.pyint(min_value = 0, max_value = 4, step = 1),
                        submission = submissions_array[i][j]
                    )
                )
                j += 1
            

        db.session.add_all(questionnaires1)
        db.session.add_all(questionnaires2)
        db.session.add_all(questionnaires3)
        db.session.commit()

        print("Seeding complete!")
