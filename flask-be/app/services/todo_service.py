from bson.objectid import ObjectId
from flask import current_app


def get_all_todos():
    """
    will find the todos from the database
    @return: todos : array of todos
    """
    db = current_app.config['db'].todos
    todos = list(db.todos.find())
    for todo in todos:
        todo['id'] = str(todo['_id'])
        del todo['_id']
    return todos


def find_todo_by_id(oid):
    """
    find todo by id from the mongo db
    @param oid: id for the collection todo
    @return:
    """
    db = current_app.config['db'].todos
    todo_id = ObjectId(oid)
    found_todo = db.todos.find_one({'_id': todo_id})
    return found_todo


def save_todo(todo):
    """
    save provided todo
    @param todo: the todo dict (which should be saved)
    @return: inserted todo object
    """
    db = current_app.config['db'].todos
    new_todo = db.todos.insert_one(todo)
    return new_todo


def update_one_todo(todo):
    """
    will update todo (it wil try to find by id and then just update)
    @param todo: todo which should be updated
    @return: updated todo object
    """
    db = current_app.config['db'].todos
    updated_todo = db.todos.update_one({'_id': todo['_id']}, {'$set': todo})
    return updated_todo


def delete_todo_by_id(oid):
    """
    will try to find todo by id and then update that
    @param oid: todo id which should be deleted
    """
    todo_id = ObjectId(oid)
    db = current_app.config['db'].todos
    db.todos.delete_one({"_id": todo_id})
