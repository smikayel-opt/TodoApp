def user_serializer(user):
    """
    Just simple serializer to serialize mongo collection for the user
    @param user: pymongo collection object
    @return: serialized dict object
    """
    return {
        "id": str(user['_id']),
        "username": user['username']
    }
