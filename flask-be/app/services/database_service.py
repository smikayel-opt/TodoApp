import os
from pymongo import MongoClient


def configure_mongodb(app):
    """
    will create the mongo db connection and will configure that in flaks app
    @param app: the flask application
    """
    app.config['MONGO_URI'] = os.getenv("MONGO_DATABASE_URI")
    client = MongoClient(app.config['MONGO_URI'])
    app.config['db'] = client


def init_app(app):
    """
    will create connection and configure the database in app context
    @param app: flask application
    """
    with app.app_context():
        configure_mongodb(app)
