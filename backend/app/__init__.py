from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
import os
from dotenv import load_dotenv
from flask_mailman import Mail

# Initialise the database
db = SQLAlchemy()

# Initialise migrations
migrate = Migrate()

# Initialise JWT
jwt = JWTManager()

# Initialise flask-mailman
mail = Mail()

# Create flask app
def create_app():
    app = Flask(__name__)

    CORS(app)

    # Load env variables
    load_dotenv()

    # Set the database URI
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Set the JWT secret key
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

    # Configure mail server
    app.config.update(
        MAIL_SERVER='smtp.titan.email',
        MAIL_PORT=465,
        MAIL_USE_TLS=False,
        MAIL_USE_SSL=True,
        MAIL_USERNAME=os.getenv('MAIL_USERNAME'),
        MAIL_PASSWORD=os.getenv('MAIL_PASSWORD')
    )

    # Initialise the database with the app
    db.init_app(app)

    # Initialise migrations
    migrate.init_app(app, db)

    # Init JWT
    jwt.init_app(app)

    # Init mail
    mail.init_app(app)

    # Register the blueprints for routes
    # Import the blueprints here to avoid circular imports
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    from .admin import admin as admin_blueprint
    app.register_blueprint(admin_blueprint, url_prefix='/admin')

    # Import models here to avoid circular imports
    with app.app_context():
        from .models import Users  # Import models within the app context
        from .models import Messages

    return app