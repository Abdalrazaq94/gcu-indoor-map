from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import Users
from . import db, mail
from sqlalchemy.exc import SQLAlchemyError
from smtplib import SMTPException
import datetime
import re

# Create a Blueprint for the auth routes
auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
    try:
        # Get the JSON data from the frontend request
        data = request.get_json()
        if not data or 'username_or_email' not in data or 'password' not in data:
            return jsonify({'error': 'Username or email and password are required'}), 400
        
        identifier = data.get('username_or_email').strip()
        password = data.get('password').strip()

        # Determine whether the input is an email or a username
        if '@' in identifier:
            # Treat the input as an email
            user = Users.query.filter_by(email=identifier).first()
        else:
            # Treat the input as a username
            user = Users.query.filter_by(username=identifier).first()

        # Check if user exists and password is correct
        if user and user.check_password(password):
            access_token = create_access_token(
                identity={'id': user.id, 'username': user.username, 'is_admin': user.is_admin},
                expires_delta=datetime.timedelta(minutes=60)  # Token expires in 60 minutes
            )
            return jsonify({'access_token': access_token}), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error occurred'}), 500
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred', 'message': str(e)}), 500


@auth.route('/register', methods=['POST'])
def register():
    try:
        # Get the JSON data from the frontend request
        data = request.get_json()
        
        # Check if all required fields are present
        if not data or 'username' not in data or 'password' not in data or 'email' not in data:
            return jsonify({'error': 'Username, password, and email are required'}), 400

        # Get the data from the JSON
        username = data.get('username').strip()
        password = data.get('password').strip()
        email = data.get('email').strip()

        # Validate the username format
        if not re.match(r'^[a-zA-Z0-9_-]{3,50}$', username):
            return jsonify({'error': 'Invalid username. Only letters, numbers, hyphens (-), and underscores (_) are allowed. Length must be between 3 and 50 characters.'}), 400

        # Check if the username already exists
        if Users.query.filter_by(username=username).first():
            return jsonify({'error': 'Username already exists'}), 400

        # Check if the email already exists
        if Users.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already exists'}), 400

        # Create a new user
        new_user = Users(username=username, email=email)
        new_user.set_password(password)
        
        # Add user to database
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully'}), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error occurred', 'message': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred', 'message': str(e)}), 500


# Route to logout a user
@auth.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify({'message': 'Successfully logged out.'}), 200


# Route to request a reset password link
@auth.route('/request-password-reset', methods=['POST'])
def request_password_reset():
    try:
        # Get the email from the JSON data
        email = request.json.get('email')
        # Check if email is present
        if not email:
            return jsonify({"error": "Email is required"}), 400

        # Find user in database
        user = Users.query.filter_by(email=email).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Generate a short term password reset token
        reset_token = user.gen_password_reset_token()

        try:
            # Send email with password reset link
            mail.send_mail(
                subject='Password Reset Request',
                 message=f'Click the link to reset your GCU Campus Guide password: http://localhost:3000/reset-password?token={reset_token}', # Change to domain once merged with main branch
                from_email='noreply@gcucampusguide.software',
                recipient_list=[email]
            )
            return jsonify({"message": "Password reset email sent."}), 200
        except SMTPException as e:
            return jsonify({"error": "Failed to send email"}), 500
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error occurred'}), 500
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500


# Route to reset user's password
@auth.route('/reset-password', methods=['POST'])
@jwt_required()
def reset_password():
    try:
        # Get the new password from the JSON data
        new_password = request.json.get('new_password')
        if not new_password:
            return jsonify({"error": "New password is required"}), 400

        # Get the user id from the JWT token
        user_id = get_jwt_identity()

        # Find user in database
        user = Users.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Set the new password
        user.set_password(new_password)
        db.session.commit()
        return jsonify({"message": "Password has been reset successfully."}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error occurred'}), 500
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500
