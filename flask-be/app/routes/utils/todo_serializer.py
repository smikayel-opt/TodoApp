def todo_serializer(todo):
    """
    Just simple serializer to serialize mongo collection of the todo
    @param todo: pymongo collection object
    @return: serialized dict object
    """
    return {
        "id": str(todo['_id']),
        "content": todo['content'],
        "completed": todo['completed']
    }
