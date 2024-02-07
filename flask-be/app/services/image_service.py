from flask import current_app
from bson.binary import Binary
from bson.objectid import ObjectId
from .utils.image_resolution import change_image_resolution


def handle_image_save(image, root_name):
    """
    @param image: image binary data
    @param root_name: name of the image without extension
    """
    output_name = f'{root_name}.jpg'
    optimized_image = change_image_resolution(image)

    db = current_app.config['db'].todos
    db.image.insert_one({'filename': output_name, 'image': Binary(optimized_image.getvalue())})


def get_image_by_oid(oid):
    """
    will find one image from database by id
    @param oid: the oid of the image which should get
    @return: image_data from the database
    """
    db = current_app.config['db'].todos
    image_data = db.image.find_one({'_id': ObjectId(oid)})
    return image_data
