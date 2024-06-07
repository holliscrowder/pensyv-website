from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer(), primary_key = True)
    username = db.Column(db.String(), unique = True, nullable = False)
    email = db.Column(db.String(), unique = True, nullable = False)
    sex = db.Column(db.String())
    age = db.Column(db.Integer())
    _password_hash = db.Column(db.String)

    __table_args__ = (db.CheckConstraint("sex = M OR sex = F OR sex = I"), db.CheckConstraint("age > 0 AND age < 130"))

    # authentication
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode("utf-8")
        )

    # relationships
    submissions = db.relationship("Submission", back_populates = "user", cascade = "all, delete")
    questionnaires = association_proxy("User", "submissions")

    # validations
    @validates("username")
    def validate_username(self, _, username):
        if not isinstance(username, str):
            raise ValueError("Username must be a string.")
        if len(username) > 100:
            raise ValueError("Username can't be over 100 characters.")
        return username
    
    @validates("email")
    def validate_email(self, _, email):
        if email.find("@"):
            return email.lower()
        else:
            raise ValueError("Email does not contain domain.")
        
    @validates("age")
    def validate_age(self, _, age):
        if age and (age < 0 or age > 130 or not isinstance(age, int)):
            return ValueError("Age must be an integer between 0 and 130.")
        return age
    
    @validates("sex")
    def validate_sex(self, _, sex):
        if sex and sex.upper() not in ("M", "F", "I"):
            return ValueError("Sex must be either M, F, or I.")
        return sex.upper()

    # serialization rules
    serialize_rules = ("-submissions",)

    def __repr__(self):
        return f"<User {self.id}: [username] {self.username} [email] {self.email} >"

class Question(db.Model, SerializerMixin):
    __tablename__ = "questions"

    id = db.Column(db.Integer(), primary_key = True)
    question_text = db.Column(db.String(), unique = True, nullable = False)

    # relationships
    questionnaires = db.relationship("Questionnaire", back_populates = "question")
    users = association_proxy("questionnaires", "question")

    # serialization rules
    serialize_rules = ("-questionnaires",)

    def __repr__(self):
        return f"<Question {self.id}: [text] {self.question_text} >"

class Questionnaire(db.Model, SerializerMixin):
    __tablename__ = "questionnaires"

    id = db.Column(db.Integer(), primary_key = True)
    # user_id = db.Column(db.Integer(), db.ForeignKey("users.id"))
    question_id = db.Column(db.Integer(), db.ForeignKey("questions.id"))
    submission_id = db.Column(db.Integer(), db.ForeignKey("submissions.id"))
    score = db.Column(db.Integer())
    # created_on = db.Column(db.DateTime(), server_default = db.func.now())
    # updated_on = db.Column(db.DateTime(), server_default = db.func.now(), server_onupdate = db.func.now())

    # relationships
    user = association_proxy("Questionnaire", "submission")
    question = db.relationship("Question", back_populates = "questionnaires")
    submission = db.relationship("Submission", back_populates = "questionnaires")

    # serialization rules
    serialize_rules = ("-user", "-question", "-submission")
    # serialize_rules = ("-user",)

    def __repr__(self):
        return f"<Questionnaire {self.id}: [user_id] {self.user_id} [question_id] {self.question_id} [score] {self.score} >"

class Submission(db.Model, SerializerMixin):
    __tablename__ = "submissions"

    id = db.Column(db.Integer(), primary_key = True)
    user_id = db.Column(db.Integer(), db.ForeignKey("users.id"))
    checked = db.Column(db.Boolean())
    created_on = db.Column(db.DateTime(), server_default = db.func.now())
    updated_on = db.Column(db.DateTime(), server_default = db.func.now())

    # relationships
    user = db.relationship("User", back_populates = "submissions")
    questionnaires = db.relationship("Questionnaire", back_populates = "submission", cascade = "all, delete")

    # serialization rules
    serialize_rules = ("-user", "-questionnaire")

    def __repr__(self):
        return f"<Survey {self.id}: [user_id] {self.user_id} [checked] {self.checked} [created_on] {self.created_on} [updated_on] {self.updated_on} >"
    


    