from . import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, JWTManager
import datetime

class Users(db.Model):
    __tablename__ = 'users'  # Name of the database table

    id = db.Column(db.Integer, primary_key=True,  nullable=False) # Primary key
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)  # Hashed password
    email = db.Column(db.String(100), unique=True, nullable=False) 
    is_admin = db.Column(db.Boolean, default=False, nullable=False)  # Whether user is an admin
    is_active = db.Column(db.Boolean, default=True, nullable=False)  # Active status for users
    created_at = db.Column(db.DateTime, server_default=db.func.now())  # Auto-timestamp for creation
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())  # Auto-timestamp for updates

    def __repr__(self):
        return f'<Users {self.id}>'
    

    # Hash the password
    def set_password(self, password):
        self.password = generate_password_hash(password) # Does not return to keep password out of memory


    # Check password
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    # Method for generating a short-term jwt token for password reset
    def gen_password_reset_token(self):
        return create_access_token(identity=self.id, expires_delta=datetime.timedelta(seconds=600))
    

# Table for storing user messages
class Messages(db.Model):
    __tablename__ = 'messages'  # Name of the database table

    message_id = db.Column(db.Integer, primary_key=True, nullable=False)  # Primary key
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign key to users table
    message = db.Column(db.Text, nullable=False)  # Message content
    created_at = db.Column(db.DateTime, server_default=db.func.now())  # Auto-timestamp for creation
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())  # Auto-timestamp for updates
    read = db.Column(db.Boolean, default=False, nullable=False)  # Whether message has been read
    message_type = db.Column(db.String(50), nullable=False)  # Type of message - Either 'feedback' or 'message'

    def __repr__(self):
        return f'<Messages {self.message_id}>'

