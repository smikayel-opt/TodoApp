from flask import Blueprint, request, jsonify
from apps.models import Todo
from bson import ObjectId

todoApi = Blueprint('todoApi', __name__)


@todoApi.route('/', methods=["GET"])
def todo():
    todo_list = Todo.objects.all()
    return [{"id": todo_el.id, "title": todo_el.title, "complete": todo_el.complete} for todo_el in todo_list], 200


@todoApi.route("/", methods=["POST"])
def add_todo():
    try:
        body = request.get_json()
        title = body["title"]
        new_todo = Todo(title=title, complete=False)
        new_todo.save()

        return jsonify(new_todo.to_dict()), 201

    except Exception as error:
        return error, 500


@todoApi.route("/delete/<string:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    try:
        todo_id = ObjectId(todo_id)
        todo = Todo.objects(id=todo_id).first()
        if not todo:
            return jsonify({"message": f"Todo with id:{todo_id} not found!"}), 404
        todo.delete()
        return jsonify(todo.to_dict()), 200
    except Exception as error:
        return jsonify({"error": str(error)}), 500


@todoApi.route("/update/<string:todo_id>", methods=["PUT"])
def update_todo(todo_id):
    try:
        todo_id = ObjectId(todo_id)
        todo = Todo.objects(id=todo_id).first()
        if not todo:
            return jsonify({"message": f"Todo with id:{todo_id} not found!"}), 404
        todo.complete = not todo.complete
        todo.save()
        return jsonify(todo.to_dict()), 200
    except Exception as error:
        return jsonify({"error": str(error)}), 500
