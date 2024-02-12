from flask import request
from services.user_service import create_user, find_user_by_username, authenticate_user
from .utils.user_serilizer import user_serializer


def init_auth_routes(app):
    """
    will initiate the routes for the authentication
    @param app: flask app
    @return:
    """
    @app.route('/api/login', methods=['POST'])
    def auth_index():
        """
        the handler for the login route
        @return: response object and the status of the response
        """
        username = request.json.get('username')
        password = request.json.get('password')
        if not username and password:
            return {"error": "Username or password are not provided!"}
        auth_res = authenticate_user(username, password)
        if 'error' in auth_res:
            return auth_res, 401
        return auth_res, 200

    @app.route('/api/sign-up', methods=['POST'])
    def sign_up():
        """
        the handler for the sign-up route
        @return: response object and the status of the response
        """
        username = request.json.get('username')
        password = request.json.get('password')
        if not username and password:
            return {"error":  "Username or password are not provided!"}
        user = find_user_by_username(username)
        if user:
            return {"error": "User already exist with this username!"}
        created_user = create_user(username, password)
        return {"user": user_serializer(created_user)}, 200
