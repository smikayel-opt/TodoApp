from .todo_routes import init_todo_routes
from .auth_routes import init_auth_routes


def bootstrap_routes(app):
    """
    will initiate all the routes for the application
    @param app: flask app
    """
    init_auth_routes(app)
    init_todo_routes(app)
