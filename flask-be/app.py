import os
from flask import Flask

from flask_cors import CORS
from dotenv import load_dotenv
from apps.models import *
from apps.todo import todoApi

# init the app
app = Flask(__name__)


# get the .env variables
load_dotenv()
debug_mode = os.getenv("DEBUG", True)
secret_key = os.getenv("SECRET_KEY")
database_uri = os.getenv("MONGO_DATABASE_URI")
db_name = os.getenv("MONGO_DATABASE_NAME")

# configure the database
app.config['MONGODB_SETTINGS'] = {
    'db': db_name,
    'host': database_uri
}
db.init_app(app)

# config cors
CORS(app)

# config Blueprints
app.register_blueprint(todoApi)

if __name__ == '__main__':
    # run flask server
    app.run(host='0.0.0.0', port=5000)
