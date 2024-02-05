import jwt
import datetime
from flask import current_app


def generate_access_token(user):
    """
    will generate the jwt access token with the default_exp_hours( 24 hours by default)
    @param user: user founded user collection from the mongo
    @return: encoded token which will include the username and the _id from the user
    """
    default_exp_hours = 24
    exp = datetime.datetime.utcnow() + datetime.timedelta(hours=default_exp_hours)
    encoded_token = jwt.encode({'id': str(user['_id']), 'username': user['username'], 'exp': exp},
                               current_app.config['JWT_SECRET'], algorithm='HS256')
    return encoded_token
