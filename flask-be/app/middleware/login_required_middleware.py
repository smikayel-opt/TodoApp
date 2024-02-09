import functools
import jwt
from flask import request, current_app
from services.user_service import find_user_by_username


def login_required(method):
    """
    Decorator for the auth checking
    @param method:  route handler function
    @return: function call with provided user (authenticated user)
    """
    @functools.wraps(method)
    def wrapper():
        auth_header = request.headers.get('Authorization')
        if not auth_header or len(auth_header.split()) != 2:
            return {"error": "Auth headers are not provided"}, 401
        _, token = auth_header.split()
        try:
            decoded = jwt.decode(token, current_app.config['JWT_SECRET'], algorithms='HS256')
        except jwt.DecodeError:
            return {"error": "Token is not valid."}, 401
        except jwt.ExpiredSignatureError:
            return {"error": "Token is expired."}, 401

        username = decoded['username']
        user = find_user_by_username(username)
        if not user:
            return {"error": "Token crushed!"}, 401
        return method(user)
    return wrapper
