from flask import current_app
from .utils.password_hasher import hash_password, check_password
from .utils.generate_jwt import generate_access_token


def find_user_by_username(username):
    """
    Find user by his username
    @param username: username of the user as string
    @return: the user object (pymongo collection)
    """
    db = current_app.config['db'].todos
    founded_user = db.user.find_one({'username': username})
    return founded_user


def create_user(username, password):
    """
    create user function which will hash password before the saving the user information
    @param username:  username of the user as string
    @param password:  not hashed password for the user
    @return: user collection object
    """
    db = current_app.config['db'].todos
    hashed_password = hash_password(password)
    user = {"username": username, "password": hashed_password}
    db.user.insert_one(user)
    return user


def authenticate_user(username, password):
    """
    will authenticate user
    @param username: inputted username from the user
    @param password: inputted password from the user
    @return: the response for the auth action it can have error whit short message
            or the token with jst token
    """
    user = find_user_by_username(username)
    if not user:
        return {'error': 'Provided username is wrong!'}
    is_valid_pass = check_password(password, user['password'])
    if not is_valid_pass:
        return {'error': 'Provided password is wrong!'}
    return {"token": generate_access_token(user)}
