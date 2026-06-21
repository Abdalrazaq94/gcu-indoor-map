from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import db
from .models import Messages

# Create a Blueprint for the main routes
main = Blueprint('main', __name__)

# Route to check the health of the server, will remove on production
@main.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'OK'})


# Route to create a new message 
@main.route('/send-message', methods=['POST'])
@jwt_required()  # This route requires a valid JWT token
def send_message():
    data = request.get_json()
    message = data.get('message')
    message_type = data.get('message_type')

    if not message or not message_type:
        return jsonify({'error': 'Message content and message type are required.'}), 400
    
    # Check if message type is valid
    if message_type not in ['enquiry', 'feedback']: # Only allow 'enquiry' or 'feedback' as message types
        return jsonify({'error': 'Invalid message type. Must be "enquiry" or "feedback".'}), 400
    
    try:    
        # Get the current user's identity from the JWT token
        identity = get_jwt_identity() 
        '''We have to then set a seperate user_id variable to get the user id from the identity dictionary
        otherwise an error will be return due to use trying to assign a variable to a dictionary.'''
        user_id = identity.get('id')

        if user_id is None:
            return jsonify({'error': 'Invalid token, user ID does not exist'}), 401

    except Exception as e:
        return jsonify({'error': f'Invalid token {str(e)}'}), 401

    try:
        # Create a new message
        new_message = Messages(user_id=user_id, message=message, message_type=message_type, read=False)

        # Add message to database
        db.session.add(new_message)
        db.session.commit()

        return jsonify({'message': 'Message sent successfully'}), 201
    except Exception as e:
        return jsonify({'error': f'An error occurred while sending the message: {str(e)} '}), 500