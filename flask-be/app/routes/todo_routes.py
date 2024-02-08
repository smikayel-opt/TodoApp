from flask import request, jsonify
from services.todo_service import get_all_todos, find_todo_by_id, save_todo, delete_todo_by_id, update_one_todo
from .utils.todo_serializer import todo_serializer
from middleware import login_required


def init_todo_routes(app):
    """
    will create the todo routes for the app (todo routes group)
    @param app: flask application
    @return:
    """
    @app.route('/api/todos/')
    @login_required
    def index(user):
        """
        the handler for the get all todos
        @return: response object and the status of the response
        """
        saved_todos = get_all_todos()
        return jsonify(saved_todos), 200

    @app.route('/api/todos/', methods=['POST'])
    def add_todo():
        """
        the handler for the add todo route
        @return: response object and the status of the response
        """
        todo = request.json.get('new-todo')
        save_todo(todo)
        return jsonify(todo_serializer(todo)), 200

    @app.route('/api/todos/<oid>', methods=['PUT'])
    def complete(oid):
        """
        route handler for mark as completed request
        @param oid: will get this param from the decorator ,it's the query param
        @return: response object and the status of the response
        """
        todo_item = find_todo_by_id(oid)
        if not todo_item:
            return jsonify({"error": "todo not found!"}), 200
        todo_item['completed'] = True
        update_one_todo(todo_item)
        return jsonify(todo_serializer(todo_item)), 200

    @app.route('/api/todos/<oid>', methods=['DELETE'])
    def delete_one(oid):
        """
        route handler for delete one it's will call database service and then will delete todo
        @param oid: will get this param from the decorator ,it's the query param
        @return: response object and the status of the response
        """
        delete_todo_by_id(oid)
        res = {"message": "Todo deleted successfully!"}
        return jsonify(res), 200
