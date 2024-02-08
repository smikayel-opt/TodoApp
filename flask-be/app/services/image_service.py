from flask import current_app
import io
from bson.binary import Binary
from bson.objectid import ObjectId
from .utils.image_resolution import change_image_resolution


def handle_image_save(image_byte_array, file_name, original_file_ext, user):
    """
    @param image: image binary data
    @param root_name: name of the image without extension
    """
    optimized_image = change_image_resolution(image_byte_array)

    db = current_app.config['db'].todos
    db.image.insert_one({
        'filename': file_name,
        'image': Binary(optimized_image.getvalue()),
        'file_extension': original_file_ext,
        'user': user['_id']
    })


def get_image_by_oid(oid):
    """
    will find one image from database by id
    @param oid: the oid of the image which should get
    @return: image_data from the database
    """
    db = current_app.config['db'].todos
    image_data = db.image.find_one({'_id': ObjectId(oid)})
    return image_data
