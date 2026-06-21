from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import Users, Messages
from . import db
from functools import wraps
from sqlalchemy.exc import SQLAlchemyError

admin = Blueprint('admin', __name__)

# Create our own custom decorator to check if the user is an admin
def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        # Get current user's identity
        current_user = get_jwt_identity()
        # Check if user is an admin
        if not current_user.get('is_admin'):
            return jsonify({'error': 'Admins access is required.'}), 403
        return fn(*args, **kwargs)
    return wrapper


# Route to get all users with page and per_page query parameters
@admin.route('/get-users', methods=['GET'])
@jwt_required()
@admin_required
def get_users():
    # Get query parameters from the request
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    try:
        # Paginate the query for users
        users = Users.query.paginate(page=page, per_page=per_page)
        
        # List comprehension for user data
        user_list = [
            {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_admin': user.is_admin,
                'is_active': user.is_active
            }
            for user in users.items
        ]

        # Return paginated data with metadata
        return jsonify({
            'data': {
                'users': user_list
            },
            'meta': {
                'page': users.page,
                'pages': users.pages,
                'per_page': users.per_page,
                'total': users.total
            }
        }), 200

    except Exception as e:
        return jsonify({'error': 'Failed to retrieve users', 'message': str(e)}), 500
# edit user info
    
@admin.route('/edit-user', methods=['POST'])
@jwt_required()
@admin_required
def edit_user():
    """
    Endpoint to edit a user's username, email, and active status.
    """
    data = request.get_json()

    # Extract required fields
    user_id = data.get('user_id')
    new_username = data.get('username')  # Optional
    new_email = data.get('email')  # Optional
    new_is_active = data.get('is_active')  # Optional

    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    try:
        # Find the user in the database
        user = Users.query.filter_by(id=user_id).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # Update username, email, and active status based on provided data
        if new_username is not None:
            user.username = new_username
        if new_email is not None:
            user.email = new_email
        if new_is_active is not None:
            user.is_active = bool(new_is_active)

        # Commit the changes
        db.session.commit()

        return jsonify({'message': 'User details updated successfully'}), 200

    except SQLAlchemyError as e:
        return jsonify({'error': 'Database error occurred', 'message': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Failed to update user details', 'message': str(e)}), 500


# Route to display messages based on if they are enquiries or feedback and if they are read or not
@admin.route('/get-messages', methods=['GET'])
@jwt_required()
@admin_required
def get_messages():
    # Get query parameters from the request
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    message_type = request.args.get('message_type', None, type=str)
    read = request.args.get('read', None, type=bool)

    # Validate page and per_page parameters
    if page <= 0 or per_page <= 0:
        return jsonify({'error': 'page and per_page must be positive integers.'}), 400
    
    # Validate message_type if provided
    if message_type and message_type not in ['enquiry', 'feedback']:
        return jsonify({'error': 'Invalid message type. Must be "enquiry" or "feedback".'}), 400

    # Handle 'read' parameter manually to interpret 'true'/'false' as Booleans
    read_param = request.args.get('read', None)
    read = None
    if read_param is not None:
        read = read_param.lower() == 'true'  # Converts 'true' to True and 'false' to False

    try:
        # Base query with join to include user data
        query = db.session.query(
            Messages.message_id,
            Messages.user_id,
            Messages.message,
            Messages.message_type,
            Messages.read,
            Users.username,
            Users.email
        ).join(Users, Messages.user_id == Users.id)

        # Filter by message_type if specified
        if message_type:
            query = query.filter(Messages.message_type == message_type)
        
        # Filter by read status if specified
        if read is not None:
            query = query.filter(Messages.read == read)

        # Paginate results
        paginated_messages = query.paginate(page=page, per_page=per_page)

        # Format message data
        message_list = [
            {
                'message_id': message.message_id,
                'user_id': message.user_id,
                'message': message.message,
                'message_type': message.message_type,
                'read': message.read,
                'username': message.username,
                'email': message.email
            }
            for message in paginated_messages.items
        ]

        # Return data with metadata
        return jsonify({
            'data': {
                'messages': message_list
            },
            'meta': {
                'page': paginated_messages.page,
                'pages': paginated_messages.pages,
                'per_page': paginated_messages.per_page,
                'total': paginated_messages.total
            }
        }), 200

    except SQLAlchemyError as e:
        return jsonify({'error': 'Database error occurred.', 'message': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred.', 'message': str(e)}), 500


# Route to set message status to read
@admin.route('/set-message-read', methods=['POST'])
@jwt_required()
@admin_required
def set_message_read():
    data = request.get_json()
    message_id = data.get('message_id')

    if not message_id:
        return jsonify({'error': 'Message ID is required'}), 400
    
    try:
        # Find the message in the database
        message = Messages.query.filter_by(message_id=message_id).first()
        if not message:
            return jsonify({'error': 'Message not found'}), 404

        # Set the message to read
        message.read = True
        db.session.commit()

        return jsonify({'message': 'Message status set to read'}), 200
    
    except Exception as e:
        return jsonify({'error': 'Failed to set message to read', 'message': str(e)}), 500
    
# Route to change admin status
@admin.route('/change-admin-status', methods=['POST'])
@jwt_required()
@admin_required
def change_admin_status():
    data = request.get_json()
    user_id = data.get('user_id')
    new_is_admin = data.get('new_is_admin') # Desired status to set user to 0 or 1

    if not user_id or new_is_admin is None:
        return jsonify({'error': 'User ID and new_is_admin are required'}), 400
    
    # Get current user's identity from JWT
    current_user = get_jwt_identity()

    # Check if the current user is an admin
    if not current_user.get('is_admin'):
        return jsonify({'error': 'Only admins can change admin status'}), 403

    try:
        # Find the user in the database
        user = Users.query.filter_by(id=user_id).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # Set the user's new admin status
        user.is_admin = new_is_admin
        db.session.commit()

        return jsonify({'message': 'Admin status changed successfully'}), 200
    
    except SQLAlchemyError as e:
        return jsonify({'error': 'Database error occurred', 'message': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Failed to change admin status', 'message': str(e)}), 500