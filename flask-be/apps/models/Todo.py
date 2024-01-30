from flask_mongoengine import MongoEngine
from mongoengine import *

db = MongoEngine()


class Todo(db.Document):
    title = StringField(max_length=100, required=True)
    complete = BooleanField(default=False)

    def to_dict(self):
        return {
            "id": str(self.id),  # Convert ObjectId to string
            "title": self.title,
            "complete": self.complete
        }

