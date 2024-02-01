from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from services.database_service import init_app, configure_mongodb
from routes.bootstrap_routes import bootstrap_routes


def init_and_configure_app():
    """
    create and configure the cors for the created flask app
    @return: flask application with configured CORS
    """
    flask_app = Flask(__name__)
    CORS(flask_app)
    return flask_app


if __name__ == '__main__':
    load_dotenv()
    app = init_and_configure_app()
    init_app(app)
    configure_mongodb(app)
    bootstrap_routes(app)
    app.run(host='0.0.0.0', port=5000)
